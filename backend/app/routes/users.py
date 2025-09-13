from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from .. import crud, schemas
from ..db import get_session

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=schemas.UserRead)
def create_user(u: schemas.UserCreate, session: Session = Depends(get_session)):
    if crud.get_user_by_email(session, u.email):
        raise HTTPException(400, "Usuário já existe")
    return crud.create_user(session, u.email, u.password)
