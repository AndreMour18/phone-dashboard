from datetime import datetime, timezone
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import Session, select, SQLModel

from app.db import get_session, engine
from app.models import Call, User
from app.schemas import CallIn
from app.utils import create_access_token, verify_password

app = FastAPI(title="Telephony Dashboard Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str
    password: str

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)
    from app.seed import seed_data
    seed_data()

@app.post("/login", summary="Login via JSON")
def login(request: LoginRequest, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == request.email)).first()
    print(request)
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/users/", summary="Create user")
def create_user(user_data: LoginRequest, session: Session = Depends(get_session)):
    from app.utils import get_password_hash

    existing = session.exec(select(User).where(User.email == user_data.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    user = User(
        email=user_data.email,
        hashed_password=get_password_hash(user_data.password),
        is_admin=False,
        created_at=datetime.now(timezone.utc),
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@app.get("/users/", response_model=List[User], summary="List users")
def list_users(session: Session = Depends(get_session)):
    return session.exec(select(User)).all()

@app.post("/calls/ingest", summary="Ingest call")
def ingest_call(call: CallIn, session: Session = Depends(get_session)):
    new_call = Call(**call.dict(), ingested_at=datetime.now(timezone.utc))
    session.add(new_call)
    session.commit()
    session.refresh(new_call)
    return new_call

@app.post("/calls/mock", summary="Create mock calls")
def create_mock_calls(session: Session = Depends(get_session)):
    from app.utils import create_mock_call

    calls = [create_mock_call(session) for _ in range(2)]
    return calls

@app.get("/calls/", response_model=List[Call], summary="List calls")
def list_calls(session: Session = Depends(get_session)):
    return session.exec(select(Call)).all()

@app.get("/metrics/asr", summary="ASR metric")
def asr_metric(session: Session = Depends(get_session)):
    calls = session.exec(select(Call)).all()
    total = len(calls)
    answered = len([c for c in calls if c.answered])
    asr = answered / total * 100 if total else 0
    return {"total_calls": total, "answered_calls": answered, "asr": asr}

@app.get("/metrics/acd_avg", summary="Average call duration")
def acd_avg_metric(session: Session = Depends(get_session)):
    calls = session.exec(select(Call)).all()
    answered_calls = [c for c in calls if c.answered and c.duration]
    avg = (
        sum(c.duration for c in answered_calls) / len(answered_calls)
        if answered_calls
        else 0
    )
    return {"average_duration": avg}

@app.get("/metrics/acd_distribution", summary="Call distribution by destination")
def acd_distribution_metric(session: Session = Depends(get_session)):
    calls = session.exec(select(Call)).all()
    dist = {}
    for c in calls:
        dest = c.destination or "unknown"
        dist[dest] = dist.get(dest, 0) + 1
    return dist
