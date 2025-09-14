from sqlmodel import Session, select
from app.models import User, Call
from app.db import engine
from app.utils import get_password_hash
from datetime import datetime, timedelta

def seed_data():
    with Session(engine) as session:
        existing_admin = session.exec(select(User).where(User.email == "admin@example.com")).first()
        if not existing_admin:
            admin = User(
                email="admin@example.com",
                hashed_password=get_password_hash("123456"),
                is_admin=True
            )
            user = User(
                email="user@example.com",
                hashed_password=get_password_hash("123456"),
                is_admin=False
            )
            session.add(admin)
            session.add(user)

        call1 = Call(
            call_id="call_seed_001",
            timestamp=datetime.utcnow() - timedelta(hours=1),
            duration=120,
            destination="5511999999999",
            sip_code=200,
            answered=True,
            raw_payload='{"seed":true}'
        )
        call2 = Call(
            call_id="call_seed_002",
            timestamp=datetime.utcnow() - timedelta(minutes=30),
            duration=0,
            destination="5511888888888",
            sip_code=486,
            answered=False,
            raw_payload='{"seed":true}'
        )
        session.add(call1)
        session.add(call2)

        session.commit()
