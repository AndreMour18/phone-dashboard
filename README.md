# 📞 Phone Dashboard

O **Phone Dashboard** é uma aplicação para monitoramento e análise de chamadas telefônicas, incluindo KPIs como **ASR (Answer Seizure Ratio)**, **ACD (Average Call Duration)**, além de relatórios e gráficos de desempenho em tempo real.

O projeto é composto por dois principais serviços:

- **Backend (FastAPI + PostgreSQL)** → responsável pela API, autenticação e persistência de dados.
- **Frontend (React + TypeScript)** → interface de usuário com gráficos, tabelas e KPIs.

---

## 🚀 Tecnologias Utilizadas

- **Backend**

  - [FastAPI](https://fastapi.tiangolo.com/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [SQLModel](https://sqlmodel.tiangolo.com/)
  - [Docker & Docker Compose](https://docs.docker.com/)

- **Frontend**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [React Router](https://reactrouter.com/)
  - [Recharts](https://recharts.org/)

---

## 📂 Estrutura do Projeto

```bash
phone-dashboard/
│── backend/        # API em FastAPI
│   ├── app/        # Código principal (models, routers, db, utils)
│   ├── Dockerfile
│   └── requirements.txt
│
│── frontend/       # Aplicação React
│   ├── src/        # Código principal (pages, contexts)
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
│── docker-compose.yml
│── .gitignore
│── README.md
```

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

Opcional (caso queira rodar localmente sem Docker):

- Python 3.11+
- Node.js 18+
- PostgreSQL

---

## ▶️ Executando o Projeto com Docker

Clone o repositório:

```bash
git clone https://github.com/AndreMour18/phone-dashboard.git
cd phone-dashboard
```

Suba os containers:

```bash
docker-compose up --build
```

Isso irá iniciar:

- **backend-api** → FastAPI rodando em [http://localhost:8000](http://localhost:8000)
- **backend-db** → PostgreSQL rodando na porta `5432`
- **frontend** → React rodando em [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Executando Localmente (sem Docker)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Linux/Mac
.venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
yarn
yarn start
```

---

## 📊 Funcionalidades

✅ Login e autenticação com JWT  
✅ Dashboard com KPIs: Total de Chamadas, Atendidas, ASR, ACD  
✅ Gráficos de série temporal (chamadas por hora/dia)  
✅ Tabela com detalhes das chamadas (período, destino, status, duração)  
✅ API documentada com Swagger UI

---

## 🧪 Teste

Para testar a aplicação, utilize as seguintes credenciais de login:

```
email: admin@example.com
senha: 123456
```

---

## 🔒 Observações Importantes

- O arquivo `.gitignore` já está configurado para ignorar arquivos sensíveis (ex: cache do Python e `node_modules`).
- Para ambiente de produção, utilize um **SECRET_KEY** forte e armazene variáveis sensíveis em um cofre de segredos (ex: AWS Secrets Manager).
- Certifique-se de que as portas **5432** (Postgres), **8000** (API) e **3000** (Frontend) estejam livres.

---

## 👨‍💻 Autores

- **Andre Moura** – Desenvolvedor Fullstack
