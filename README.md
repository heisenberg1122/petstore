# MyPetStore

MyPetStore is a pet e-commerce starter built with Spring Boot, PostgreSQL,
React, Tailwind, and MUI.

## Repository Layout

```text
backend/   Spring Boot API
frontend/  React storefront
```

## Backend

The backend exposes a simple catalog API under `/api/catalog` and is prepared
for PostgreSQL-backed persistence.

## Frontend

The frontend uses Vite, Tailwind, and MUI to render a responsive storefront for
dogs, cats, birds, and fishes.

### Firebase login setup

Customer login uses Firebase Authentication for email/password, Google, and
Facebook sign-in. Create `frontend/.env` with your Firebase web app values using
the `VITE_FIREBASE_*` keys, then enable the Google and Facebook providers in the
Firebase Console.

The admin frontend is a clean launcher that opens the backend admin panel. Use
`VITE_ADMIN_PANEL_URL` in `frontend/.env` to point it at your backend admin URL
when it differs from `http://localhost:8080/admin`.

## Run Locally

1. Start PostgreSQL.
2. Set the backend database environment variables.
3. Set the Firebase environment variables in `frontend/.env`.
4. Run the backend from `backend/`.
5. Run the frontend from `frontend/`.

## Render Deployment

Use one Render web service for the backend, one PostgreSQL instance for data,
and one static site for the frontend.
