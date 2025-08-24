
## 🚀 Prerequisites

* Node.js 18+ & npm
* MySQL (local or Cloud SQL via Proxy)
* `.env` file for **Backend** and (optional) **Frontend**

---


## 🔧 Installation

Run installation **in each folder**:

```bash
# 1) Backend
cd Backend
npm install

# 2) Frontend
cd ../Frontend
npm install
```

---

## 🧪 Development

### 1) Run Backend (API)

```bash
cd Backend

# run migrations first
npm run migrate

# then start the backend
npm run start
```

Default URL: `http://127.0.0.1:5000`
Make sure `.env` in Backend is correctly filled (see example below).

### 2) Run Frontend (Remix dev server)

```bash
cd ../Frontend
npm run dev
```

Default URL: `http://127.0.0.1:8080`
