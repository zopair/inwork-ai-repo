# InWork API Contract

## Version
v1 — planned contract for the collaborative services domain.

This document defines the intended service API surface. Endpoints are not considered production-ready until implemented, authenticated, authorized, validated, and covered by integration tests.

## Discovery
- GET /service-categories
- GET /providers?category_id=&query=&area=&remote=
- GET /providers/{provider_id}
- GET /providers/{provider_id}/services

## Customer
- POST /service-requests
- GET /me/service-requests
- GET /service-requests/{request_id}
- GET /service-requests/{request_id}/offers
- POST /service-offers/{offer_id}/accept
- POST /service-requests/{request_id}/cancel
- POST /service-requests/{request_id}/reviews

## Provider
- GET /me/provider-profile
- PUT /me/provider-profile
- POST /me/provider-services
- PATCH /me/provider-services/{service_id}
- GET /me/service-offers
- POST /service-requests/{request_id}/offers
- POST /service-offers/{offer_id}/withdraw

## Administration
- POST /admin/providers/{provider_id}/verification
- GET /admin/service-reports

## Required invariants
- Every private endpoint requires an authenticated session.
- Ownership is verified on the server; never trust a client-supplied user ID.
- Provider offers are accepted only for open requests in a category where the provider has an active listed service.
- Accepting an offer must be a single server-side transaction: lock the request, confirm it is still open, accept exactly one offer, decline or close competing offers, and set the selected provider.
- Request state transitions are validated against an explicit transition table.
- Verification and administrative operations require a trusted server-side role.
- Validate payloads and enforce length, numeric, enum, and rate limits on the server.
- Return consistent error envelopes without exposing SQL, secrets, or internal stack traces.

## Deferred until designed
- Messaging and attachments.
- Payment intents, refunds, commissions, and settlement.
- Push notifications and realtime subscriptions.
- Geospatial search and distance ranking.
