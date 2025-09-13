import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.db import get_session
from sqlmodel import SQLModel, create_engine, Session

# Cria um DB temporário para testes
DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})


@pytest.fixture(name="session")
def session_fixture():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(session):
    # Substitui o dependency do session pelo do teste
    def get_session_override():
        yield session

    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()
