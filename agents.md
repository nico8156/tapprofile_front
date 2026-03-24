# TapProfile Frontend Agent Guide

## 🎯 Current Product State

The MVP is FUNCTIONAL and STABLE.

Core flow works end-to-end:
- create profile
- publish profile
- generate badge (QR)
- scan badge
- create connection
- view dashboard
- view contacts
- simple entry point
- product landing pages

The focus is now:
👉 UX clarity
👉 onboarding
👉 conversion
👉 product iteration

---

# A. 🔐 BACKEND CONTRACTS (SOURCE OF TRUTH)

⚠️ NEVER invent fields. ALWAYS respect backend responses.

### Create profile
POST /api/profiles

Required:
- slug
- displayName
- headline (MUST NOT be blank)
- bio
- role: VISITOR | EXHIBITOR

---

### Publish profile
POST /api/profiles/{profileId}/publish → 204

---

### Dashboard
GET /api/profiles/{profileId}/dashboard

Contains:
- profile
- metrics:
  - viewCount
  - scanCount
  - leadCount (legacy)
  - connectionCount
  - conversionRate
- recentLeads (legacy)

⚠️ DO NOT expect:
- badge
- recentConnections

---

### Badge
GET /api/profiles/{profileId}/badge

---

### Public badge
GET /api/public/badges/{badgeToken}

---

### Connections
GET /api/profiles/{profileId}/connections

Returns ARRAY (not nested):
- profileId
- displayName
- headline
- role
- createdAt

---

### Create connection
POST /api/connections

⚠️ Backend is IDPOTENT:
- A-B and B-A must NOT create duplicates

---

### Error format

```json
{
  "errors": [{ "code": "", "message": "", "field": "" }]
}
```

B. 🧱 ARCHITECTURE
Stack
Next.js App Router
Hexa-inspired frontend
Layers
core-logic → usecases
adapters → gateways + view-models
UI → React components
Identity

localStorage key:
tapprofile.identity

C. 🚀 CURRENT FEATURES (STABLE)
Core
profile creation
publish
badge generation
QR display
scan → public badge
connection creation (no duplicates)
dashboard (scans + connections)
contacts page
local identity
UX (recent improvements)
no automatic redirects
single CTA per screen
clear success states
connection feedback (added / already exists)
dashboard simplified
mobile-first readability
Landing pages
/product (baseline)
/product-v2 (pain-driven)
/product-v3 (projection)

Used for messaging & A/B testing.

D. 🎯 CURRENT PRIORITIES

We are no longer building core features.

We are optimizing:

1. UX clarity
instant understanding (2 seconds)
no ambiguity
no friction
2. Onboarding
explain value immediately
guide first action
3. Conversion
scan → click → connection
reduce hesitation
improve CTA clarity
4. Landing experiments
test different messaging angles
compare variants manually
no premature tracking complexity
E. 🧠 BUSINESS INVARIANTS
one connection per pair (A-B == B-A)
no redirect without user intent
one action = one click
UI must NEVER crash
arrays must NEVER be undefined
success must always give feedback
user must always know what to do next
F. 🛠️ CODEX RULES

ALWAYS:

no massive refactor
incremental changes only
respect architecture
respect backend contracts
mobile-first
simple UX

NEVER:

invent backend fields
add hidden logic
introduce multiple competing CTAs
over-engineer
G. 🧪 MVP TEST SCENARIO
create profile A
publish + get badge
open badge in private mode
create profile B
scan A
add contact
verify:
connectionCount
contacts list
no duplicate on reverse scan
H. 🎯 PRODUCT VISION

"Exchange contacts at meetups as easily as scanning a QR code."

I. 🚀 CURRENT PHASE

We are now in:

👉 PRODUCT OPTIMIZATION PHASE

Focus:

UX
clarity
conversion
real-world usage

NOT:

new complex features
architecture redesign
FINAL RULE

If in doubt:

👉 prefer simplicity + clarity over completenessgg


