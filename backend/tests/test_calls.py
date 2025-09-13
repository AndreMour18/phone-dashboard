from datetime import datetime, timezone


def test_ingest_call(client):
    payload = {
        "call_id": "call-123",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "duration": 120,
        "destination": "5511999999999",
        "sip_code": 200,
        "answered": True,
        "raw_payload": {"foo": "bar"},
    }
    response = client.post("/calls/ingest", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["call_id"] == "call-123"


def test_list_calls(client):
    client.post("/calls/mock")  # cria chamadas fake
    response = client.get("/calls")
    assert response.status_code == 200
    assert len(response.json()) >= 2  # assume que mock cria 2 chamadas
