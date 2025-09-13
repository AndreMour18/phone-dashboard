from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlmodel import Session

from .. import crud, schemas
from ..db import get_session
from ..models import Call

router = APIRouter(prefix="/calls", tags=["calls"])


@router.post("/ingest")
def ingest_call(call: schemas.CallIn, session: Session = Depends(get_session)):
    return crud.ingest_call(session, call.dict())


@router.post("/mock")
def mock_calls(session: Session = Depends(get_session)):
    calls = [
        Call(
            call_id="mock-1",
            timestamp=datetime.now(timezone.utc),
            duration=30,
            destination="5511999999999",
            sip_code=200,
            answered=True,
        ),
        Call(
            call_id="mock-2",
            timestamp=datetime.utcnow(),
            duration=0,
            destination="5511888888888",
            sip_code=486,
            answered=False,
        ),
    ]
    session.add_all(calls)
    session.commit()
    return {"inserted": len(calls)}


@router.get("/")
def list_calls(session: Session = Depends(get_session)):
    return session.exec(select(Call)).all()
