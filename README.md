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

## Run Locally

1. Start PostgreSQL.
2. Set the backend database environment variables.
3. Run the backend from `backend/`.
4. Run the frontend from `frontend/`.

## Render Deployment

Use one Render web service for the backend, one PostgreSQL instance for data,
and one static site for the frontend.
