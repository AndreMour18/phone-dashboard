from datetime import datetime
from typing import Optional

from sqlmodel import Session, select

from .auth import hash_password
from .models import Call, User


def create_user(
    session: Session, email: str, password: str, is_admin: bool = False
) -> User:
    user = User(email=email, hashed_password=hash_password(password), is_admin=is_admin)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def get_user_by_email(session: Session, email: str) -> Optional[User]:
    return session.exec(select(User).where(User.email == email)).first()


def ingest_call(session: Session, call_data: dict) -> Call:
    call_id_raw = call_data.get("call_id")
    timestamp_raw = call_data.get("timestamp")
    duration = call_data.get("duration")
    destination = call_data.get("destination")
    sip_code = call_data.get("sip_code")
    answered = call_data.get("answered", False)
    raw_payload = str(call_data)

    if call_id_raw is None:
        raise ValueError("O 'call_id' não pode ser nulo.")

    if timestamp_raw is None:
        raise ValueError("O 'timestamp' não pode ser nulo.")

    if isinstance(timestamp_raw, (int, float)):
        timestamp_processed = datetime.fromtimestamp(timestamp_raw)
    elif isinstance(timestamp_raw, str):
        try:
            timestamp_processed = datetime.fromisoformat(timestamp_raw)
        except ValueError:
            raise ValueError(f"Formato de data inválido: {timestamp_raw}")
    else:
        raise TypeError(f"Tipo de 'timestamp' não suportado: {type(timestamp_raw)}")

    c = Call(
        call_id=call_id_raw,
        timestamp=timestamp_processed,
        duration=duration,
        destination=destination,
        sip_code=sip_code,
        answered=answered,
        raw_payload=raw_payload,
    )
    session.add(c)
    session.commit()
    session.refresh(c)
    return c
