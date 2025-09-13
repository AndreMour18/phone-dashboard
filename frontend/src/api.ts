const API = "http://localhost:8000";

export async function login(email: any, password: any) {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);
  const res = await fetch(`${API}/auth/token`, {
    method: "POST",
    body: form,
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
