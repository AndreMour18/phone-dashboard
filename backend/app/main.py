from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, SQLModel

from . import auth, crud, schemas
from .db import engine, get_session
from .routes import calls, metrics, users

app = FastAPI(title="Telephony Dashboard API")


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


@app.post("/auth/token", response_model=schemas.Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    user = crud.get_user_by_email(session, form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    token = auth.create_access_token({"sub": user.email})
    return {"access_token": token}


# incluir rotas
app.include_router(users.router)
app.include_router(calls.router)
app.include_router(metrics.router)
