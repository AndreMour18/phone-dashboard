from datetime import datetime, timedelta, timezone

from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "sua_chave_secreta_super_segura"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_mock_call(session):
    from datetime import datetime

    from app.models import Call

    call = Call(
        call_id="mock123",
        timestamp=datetime.now(timezone.utc),
        duration=120,
        destination="5511999999999",
        sip_code=200,
        answered=True,
        raw_payload={"foo": "bar"},
        ingested_at=datetime.utcnow(),
    )
    session.add(call)
    session.commit()
    session.refresh(call)
    return call
