from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from ..db import get_session
from ..models import Call

router = APIRouter(prefix="/metrics", tags=["metrics"])


@router.get("/asr")
def get_asr(hours: int = 24, session: Session = Depends(get_session)):
    since = datetime.now(timezone.utc) - timedelta(hours=hours)
    calls = session.exec(select(Call).where(Call.timestamp >= since)).all()
    total = len(calls)
    answered = sum(1 for c in calls if c.answered)
    asr = (answered / total * 100) if total else 0.0
    return {"total": total, "answered": answered, "asr": asr}


@router.get("/acd_avg")
def get_acd_avg(hours: int = 24, session: Session = Depends(get_session)):
    since = datetime.now(timezone.utc) - timedelta(hours=hours)
    calls = session.exec(select(Call).where(Call.timestamp >= since)).all()
    durations = [c.duration for c in calls if c.duration]
    avg = (sum(durations) / len(durations)) if durations else 0
    return {"avg_duration": avg}


@router.get("/acd_distribution")
def get_acd_distribution(hours: int = 24, session: Session = Depends(get_session)):
    since = datetime.now(timezone.utc) - timedelta(hours=hours)
    calls = session.exec(select(Call).where(Call.timestamp >= since)).all()
    dist = {}
    for c in calls:
        dist[c.destination] = dist.get(c.destination, 0) + 1
    return {"distribution": dist}
