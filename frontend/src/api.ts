const API = "http://localhost:8000";

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Falha no login");
  return res.json();
}

export async function fetchASR(token: any) {
  const res = await fetch(`${API}/metrics/asr`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function listCalls(token: any) {
  const res = await fetch(`${API}/calls`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
