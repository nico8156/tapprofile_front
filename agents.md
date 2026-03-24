# TapProfile — Reprise projet (MVP badge + connections)

## 🎯 Objectif actuel

Finaliser un MVP fonctionnel pour meetup permettant :

* créer un badge (profil)
* échanger des contacts via QR code
* consulter ses connexions
* exploiter les données après l’événement

---

# A. 🔐 CONTRATS BACKEND (SOURCE DE VÉRITÉ)

## 1. Create profile

POST /api/profiles

request:
{
"slug": string,
"displayName": string,
"headline": string,
"bio": string,
"role": "VISITOR" | "EXHIBITOR"
}

response 201:
{
"profileId": string
}

---

## 2. Publish profile

POST /api/profiles/{profileId}/publish

response: 204

---

## 3. Get dashboard

GET /api/profiles/{profileId}/dashboard

response:
{
"profile": {
"profileId": string,
"slug": string,
"displayName": string,
"role": string,
"status": string
},
"metrics": {
"viewCount": number,
"scanCount": number,
"leadCount": number,
"connectionCount": number,
"conversionRate": number
},
"recentLeads": []
}

⚠️ NOTE:

* PAS de badge dans cette réponse
* PAS de recentConnections

---

## 4. Get badge (owner)

GET /api/profiles/{profileId}/badge

response:
{
"badgeToken": string,
"publicBadgeUrl": string
}

---

## 5. Get public badge

GET /api/public/badges/{badgeToken}

response:
{
"profileId": string,
"displayName": string,
"headline": string,
"role": string
}

---

## 6. Create connection

POST /api/connections

request:
{
"sourceProfileId": string,
"targetProfileId": string
}

response: 201

---

## 7. Get connections

GET /api/profiles/{profileId}/connections

response:
[
{
"profileId": string,
"displayName": string,
"headline": string,
"role": string,
"createdAt": string
}
]

---

## 8. Error format

{
"errors": [
{
"code": string,
"message": string,
"field": string | null
}
]
}

---

# B. 🧱 ARCHITECTURE PROJET

## Backend

* Spring Boot
* Hexagonal architecture
* Domain-driven (VO, invariants)
* Result pattern
* No mocks
* Tests:

  * unit
  * integration (IT)
  * E2E style

## Frontend

* Next.js (App Router)
* Hexa-inspired:

  * core-logic (usecases)
  * adapters (gateway, view-model)
  * UI React
* localStorage pour identity:
  "tapprofile.identity"

---

# C. 🚀 ÉTAT ACTUEL MVP

## Ce qui fonctionne

* création profil
* publication
* génération badge
* QR code
* scan → page badge
* création connection
* dashboard avec stats
* stockage identité locale

## Problèmes résolus récemment

* redirect automatique supprimé
* badge chargé séparément
* dashboard aligné backend
* crash undefined corrigés

---

# D. 🎯 OBJECTIF FINAL MVP (PROCHAINS PAS)

## 1. Page contacts dédiée

Route:
/dashboard/{profileId}/contacts

Afficher:

* liste complète des connections
* nom
* headline
* role
* date

---

## 2. Dashboard propre

* supprimer toute notion de "lead"
* remplacer par "connexions"
* afficher:

  * scanCount
  * connectionCount
  * preview des connexions

---

## 3. Badge téléchargeable

Permettre:

* télécharger image (QR + nom + headline)

---

## 4. Accès utilisateur simple

Créer page d’entrée:

* si identity existe:

  * "Voir mon dashboard"
  * "Voir mon badge"
  * "Voir mes contacts"

---

## 5. UX mobile-first

* pages lisibles en 2 secondes
* CTA unique
* feedback immédiat

---

# E. 🧠 INVARIANTS MÉTIER

* une connection nécessite:

  * un scanner identifié (identity locale)
  * un badge scanné valide
* pas de redirect automatique
* une action = un click utilisateur
* dashboard ne doit jamais crash
* tableaux → jamais undefined

---

# F. 🛠️ RÈGLES POUR CODEX

Toujours:

* PAS de refactor massif
* respecter architecture existante
* changements incrémentaux
* adapter au contrat backend réel
* ajouter tests si nécessaire
* rester mobile-first

---

# G. 🧪 SCÉNARIO DE TEST MVP

1. créer profil A
2. récupérer badge A
3. ouvrir badge A en navigation privée
4. créer profil B
5. retour badge A
6. ajouter contact
7. vérifier:

   * connectionCount B
   * GET /connections B
   * affichage dashboard B

---

# H. OBJECTIF PRODUIT

"Échanger ses contacts en meetup aussi facilement qu’un QR code, et les retrouver ensuite sans friction."

---
