from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    email: str
    password: str


class UserRead(BaseModel):
    id: int
    email: str
    is_admin: bool


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class CallIn(BaseModel):
    call_id: str
    timestamp: datetime
    duration: Optional[int] = None
    destination: Optional[str] = None
    sip_code: Optional[int] = None
    answered: bool = False
    raw_payload: Optional[dict] = None
