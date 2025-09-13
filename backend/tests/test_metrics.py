def test_asr_metric(client):
    client.post("/calls/mock")
    response = client.get("/metrics/asr")
    assert response.status_code == 200
    data = response.json()
    assert "total_calls" in data
    assert "answered_calls" in data
    assert "asr" in data


def test_acd_avg_metric(client):
    client.post("/calls/mock")
    response = client.get("/metrics/acd_avg")
    assert response.status_code == 200
    data = response.json()
    assert "average_duration" in data
