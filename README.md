# MyPetStore

MyPetStore is a pet e-commerce starter built with Spring Boot, React, Tailwind,
and MUI.

## Project Layout

```text
backend/
  pom.xml
  src/
frontend/
  index.html
  public/
  src/
README.md
render.yaml
```

## Backend

The backend exposes the API and runs on port `8082` by default in local dev.
It uses an in-memory H2 database out of the box, so you can start it without a
local PostgreSQL server.

## Frontend

The frontend uses Vite, Tailwind, and MUI to render the storefront.
The Vite dev server runs on port `5173`, and frontend API calls are proxied to
the backend on `http://localhost:8082`.

### Firebase login setup

Customer login uses Firebase Authentication for email/password, Google, and
Facebook sign-in. Copy `frontend/.env.example` to `frontend/.env`, fill in your
Firebase web app values using the `VITE_FIREBASE_*` keys, then enable the Google
and Facebook providers in the Firebase Console.

The admin frontend opens the backend admin panel. Use `VITE_ADMIN_PANEL_URL`
in `frontend/.env` to point it at your backend admin URL when it differs from
`http://localhost:8082/admin`.

## Run Locally

1. Run the backend from `backend/` with Maven.
2. Run the frontend from `frontend/` with `npm run dev`.
3. Update `frontend/.env` if you need Firebase or admin URL overrides.

## Ignored Generated Files

The repo ignores build output and installed dependencies such as:

- `backend/target/`
- `frontend/node_modules/`
- `frontend/.vite/`
- `frontend/tsconfig.tsbuildinfo`

## Render Deployment

Use one Render web service for the backend and one static site for the frontend.
