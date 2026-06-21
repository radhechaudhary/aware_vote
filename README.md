# AwareVote 🗳️

**AwareVote** is a dual-dashboard civic-tech platform built to support the vision of **"One Nation, One Election."** It connects three kinds of users — **Voters**, **Candidates/Leaders**, and the **Election Commission (EC)** — on a single platform where identity and candidate information are verified, discussion is community-driven, and misinformation is checked by AI before it spreads.

## Why AwareVote?

Elections generate a flood of claims, rumors, and unverified candidate information. AwareVote tries to fix that by:
- Giving every candidate a **document-verified profile** signed off by the Election Commission.
- Letting voters **search, rate, and discuss** candidates in one place instead of scattered social media threads.
- Catching **fake news and misinformation** with an AI-powered chatbot and a fake-message classifier before it spreads in community chats.
- Hosting **events and live community rooms** to keep voters informed and engaged.
- Supporting **multiple languages** (English & Hindi) so it isn't limited to one audience.

## Dashboards

| Dashboard | Who it's for | What it does |
|---|---|---|
| **Voter Portal** | Registered citizens | OTP-based login, search candidates, view verified profiles, like/dislike & comment, join communities, get event updates, chat with the AI fact-check bot |
| **Leader (Candidate) Portal** | Contesting candidates | Register, submit identity & verification documents, manage their public profile, track verification status, engage with voter comments |
| **EC (Admin) Dashboard** | Election Commission staff | Review pending candidate verification submissions, approve/reject documents, create and manage voter communities, oversee platform activity |

## Core Features

### 🔍 Verified Candidate Search
Voters can search candidates by name or constituency code and view a verified profile pulled from the EC-approved candidate database.

### ✅ Document-Backed Candidate Verification
Candidates submit Aadhaar card, voter ID, party ticket, affidavit, education certificates, and social work proof. Submissions sit in a pending queue until an EC admin reviews and approves them — so what voters see is verified, not self-reported.

### 👍 Like / Dislike & Comments
Voters can react to and comment on candidate profiles, giving a real-time sense of public sentiment.

### 🗣️ Voter Communities
EC-created communities let voters discuss issues in real time — including live discussion rooms (powered by Socket.IO) with group messaging and a "raise hand" feature for moderated conversations.

### 🤖 AI Fact-Check Chatbot
A floating chatbot lets voters ask questions about elections and voting, or verify a political claim, powered by generative AI.

### 🛡️ Fake News Detection
Messages posted in communities are passed through a trained classifier (invoked as a Python subprocess) to flag likely misinformation before it's shown.

### 📅 Events
The EC and platform can publish election-related events to keep voters informed.

### 🌐 Multilingual UI
Built with i18next, with English and Hindi translations included out of the box.

### 🔐 Role-Based Auth
Separate, cookie/JWT-based authentication flows for Voters (OTP), Leaders (email/password), and EC Admins (ID/password), each with its own protected routes.

## Tech Stack

### Frontend (`/frontend`)
- **React 18 + TypeScript** (Vite, SWC)
- **Tailwind CSS** + **shadcn/ui** (Radix UI primitives)
- **React Router** for routing
- **TanStack Query** & **Axios** for data fetching
- **Socket.IO Client** for real-time community rooms
- **i18next / react-i18next** for English & Hindi localization
- **React Hook Form / Formik** with **Zod / Yup** validation
- **Framer Motion** for animation, **Recharts** for analytics charts

### Backend (`/Backend`)
- **Node.js + Express 5**
- **PostgreSQL** (via `pg`)
- **JSON Web Tokens** + **httpOnly cookies** for auth, **bcryptjs** for hashing
- **Multer** for verification document uploads
- **Socket.IO** for live community rooms
- **express-rate-limit** for basic abuse protection
- **Google Generative AI** / **OpenAI SDK** for the fact-check chatbot
- A **Python classifier** invoked via `child_process` for fake-message detection

## Project Structure

```
aware_vote/
├── Backend/
│   ├── controllers/        # Route logic (EC, leaders, communities, search)
│   ├── routes/              # Express route definitions
│   ├── middelwares/         # Auth (JWT) & file upload (Multer) middleware
│   ├── databases/           # PostgreSQL connection
│   ├── socket/              # Socket.IO event handlers (live rooms)
│   ├── uploads/              # Uploaded verification documents
│   └── index.js              # App entry point
└── frontend/
    ├── src/
    │   ├── pages/             # Landing, Home, Leaders, Communities, dashboards, auth
    │   ├── components/        # Navbar, SearchBar, LeaderCard, AIChatbot, UI kit
    │   ├── locales/           # en.json, hi.json
    │   └── hooks/ lib/        # Shared utilities
    └── vite.config.ts
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL
- Python 3 with a trained fake-news classifier model (for the `/community/verifyMessage` endpoint)

### 1. Clone the repo
```bash
git clone https://github.com/radhechaudhary/aware_vote.git
cd aware_vote
```

### 2. Backend setup
```bash
cd Backend
npm install
```

Create a PostgreSQL database named `aware_vote` with the required tables (`leaders_data`, `comments`, `communities`, `pending_verification`, `admin`, `leader_login_credential`, etc.).

> **Note:** Database credentials and JWT secrets are currently hardcoded in `Backend/databases/aware_vote.database.js` and the auth controllers. Before deploying or sharing this project, move these into a `.env` file and load them with a package like `dotenv`.

Run the server:
```bash
npm run dev
```
The API runs on **`http://localhost:3000`**.

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
The app runs on **`http://localhost:8080`** (matches the CORS config in `Backend/index.js`).

### 4. Fake-news classifier (optional)
The `/community/verifyMessage` route spawns a local Python script (`predict.py`) to classify messages. Update the Python interpreter path and script location in `Backend/routes/community.route.js` to match your environment, and place your trained model/script alongside it.

## API Overview

| Route prefix | Purpose |
|---|---|
| `/voter-auth` | Voter OTP login & session validation |
| `/leader-auth` | Candidate login, document verification submission |
| `/leaders` | Candidate search (by name/constituency), profiles, comments |
| `/ec` | EC admin login, reviewing pending verifications, creating communities |
| `/community` | Fetching communities, fake-message verification |
| `/chatbot` | AI fact-check chatbot |

## Roadmap

- [ ] Move secrets (DB credentials, JWT keys) to environment variables
- [ ] Complete city/district-based candidate search
- [ ] Finish the `/chatbot` backend implementation
- [ ] Add automated tests
- [ ] Containerize backend + Python classifier for easier deployment

### This is Protype purely built for election commission on India

