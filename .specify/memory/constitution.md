<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
	- Principle 1 -> I. Pet-Centric Domain Modeling
	- Principle 2 -> II. API-First Spring Boot Backend
	- Principle 3 -> III. Consistent, Accessible Frontend Experience
	- Principle 4 -> IV. Security, Data Integrity, and Trust
	- Principle 5 -> V. Testable, Deployable, and Maintainable Delivery
- Added sections:
	- Architecture and Platform Standards
	- Development and Quality Gates
- Removed sections: none
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md (reviewed; no changes required)
	- ✅ .specify/templates/spec-template.md (reviewed; no changes required)
	- ✅ .specify/templates/tasks-template.md (reviewed; no changes required)
	- ✅ .github/copilot-instructions.md (reviewed; no changes required)
- Deferred items: none
-->

# MyPetStore Constitution

## Core Principles

### I. Pet-Centric Domain Modeling
The application MUST model the catalog, inventory, pricing, orders, and customer
flows around the pet store business domain. Product types MUST explicitly support
dogs, cats, birds, and fishes as first-class catalog categories, with shared
domain rules implemented once and reused across checkout, search, and
administration features. The domain model MUST keep species-specific attributes
extensible so future categories can be added without rewriting core workflows.

### II. API-First Spring Boot Backend
All business rules, data validation, order orchestration, and persistence MUST
live in the Java Spring Boot backend. The frontend MUST consume versioned HTTP
APIs and MUST NOT duplicate server-side business rules. PostgreSQL is the source
of truth, and database schema changes MUST be applied through explicit
migrations. Backend services MUST remain stateless so they can be scaled and
deployed independently on Render.

### III. Consistent, Accessible Frontend Experience
The frontend MUST be built with React, Tailwind, and MUI, using MUI for
interactive components and Tailwind for layout, spacing, and responsive
composition. Screens MUST be mobile-first, accessible, and visually consistent
across catalog browsing, product detail, cart, checkout, and account flows.
Shared UI patterns MUST be centralized in reusable components to avoid
duplicated behavior and inconsistent styling.

### IV. Security, Data Integrity, and Trust
User input MUST be validated on both client and server, but the backend is the
final authority for acceptance, pricing, inventory, and order state. Secrets
MUST be stored in environment variables, authentication and authorization MUST
protect administrative operations, and sensitive data MUST never be exposed in
client bundles or logs. Operations that affect money, inventory, or orders MUST
be transactional and auditable.

### V. Testable, Deployable, and Maintainable Delivery
Every non-trivial change MUST include tests that prove the behavior that changed,
with emphasis on API contracts, business rules, and critical UI flows. Release-
ready code MUST build and run in a Render-friendly configuration using free-tier
constraints, including stateless web services, managed PostgreSQL, and static
hosting for the frontend. The codebase MUST favor simple, maintainable
implementations over unnecessary abstraction, and deployment readiness MUST be
checked before merging significant changes.

## Architecture and Platform Standards

The stack is fixed for the initial product direction: Java Spring Boot for the
backend, PostgreSQL for persistence, React for the frontend, Tailwind for
utility styling, and MUI for component primitives and complex UI controls. The
backend MUST expose clear REST endpoints for catalog, cart, checkout, orders,
and administration concerns. The system SHOULD separate concerns into
presentation, application, domain, and infrastructure layers so the code remains
understandable as the product grows.

Render deployment is the reference environment. The backend MUST be suitable for
a Render web service, the database MUST be suitable for Render PostgreSQL, and
the frontend MUST be suitable for a Render static site. Environment-specific
values MUST come from configuration, and the application MUST degrade gracefully
when free-tier resources introduce cold starts or limited capacity.

## Development and Quality Gates

Feature work SHOULD start from a written spec or task breakdown before
implementation when the change affects user flows, data structures, or
deployment behavior. Backend changes MUST include unit or integration coverage
for business logic and API responses. Frontend changes MUST include component or
interaction coverage for critical commerce journeys such as browsing, cart
management, and checkout.

Schema updates, API contract changes, and deployment configuration changes MUST
be reviewed together so the application and database stay aligned. Any change
that alters ordering, pricing, inventory, or payment-related behavior MUST
include explicit verification of the affected flow. If a change cannot be
validated locally, the missing validation MUST be called out before release.

## Governance

This constitution supersedes other project guidance when they conflict.
Amendments MUST be made by updating this file first, then propagating any
required supporting changes to templates, prompts, or runtime guidance. Every
amendment MUST include a semantic version bump: MAJOR for breaking governance
changes, MINOR for new or materially expanded principles or sections, and PATCH
for clarifications.

Compliance is mandatory for all planning, implementation, and review activities.
When a spec or plan conflicts with this constitution, the spec or plan MUST
change instead of silently weakening the principle. The current constitution
version is 1.0.0 and it is effective as of 2026-04-28.

**Version**: 1.0.0 | **Ratified**: 2026-04-28 | **Last Amended**: 2026-04-28
