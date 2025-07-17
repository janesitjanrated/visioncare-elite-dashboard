# Production-Ready Backend Plan: Solo Optics Oasis

---

## 1. Entity Relationship Diagram (ERD)

> **หมายเหตุ:** ตัวอย่างนี้ใช้ PostgreSQL, มี soft delete, audit, security, relation table, normalization

```mermaid
erDiagram
  ORGANIZATION {
    string id PK
    string name
    string address
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  BRANCH {
    string id PK
    string org_id FK
    string name
    string address
    string status
    jsonb coordinates
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  STAFF {
    string id PK
    string org_id FK
    string branch_id FK
    string name
    string email
    string role
    string password_hash
    string avatar
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  PATIENT {
    string id PK
    string org_id FK
    string branch_id FK
    string name
    string email
    string phone
    date date_of_birth
    string gender
    string status
    string photo
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  INSURANCE {
    string id PK
    string patient_id FK
    string provider
    string policy_number
    string group_number
    bool verified
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  APPOINTMENT {
    string id PK
    string patient_id FK
    string staff_id FK
    string branch_id FK
    string type
    timestamptz date
    string status
    string notes
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  PRESCRIPTION {
    string id PK
    string patient_id FK
    string staff_id FK
    string type
    jsonb data
    timestamptz date
    string notes
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  TRANSACTION {
    string id PK
    string patient_id FK
    string staff_id FK
    string description
    numeric amount
    string type
    string method
    timestamptz date
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  INVENTORY_ITEM {
    string id PK
    string branch_id FK
    string supplier_id FK
    string name
    string sku
    string category
    int quantity
    int reorder_point
    numeric price
    string status
    bool is_custom
    timestamptz last_updated
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  SUPPLIER {
    string id PK
    string name
    string contact
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  LOAN {
    string id PK
    string org_id FK
    string lender
    string loan_type
    numeric original_amount
    numeric remaining_balance
    numeric interest_rate
    int term
    timestamptz start_date
    timestamptz next_payment_date
    numeric monthly_payment
    string status
    string collateral
    string purpose
    string notes
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  LOAN_PAYMENT {
    string id PK
    string loan_id FK
    timestamptz date
    numeric amount
    numeric principal
    numeric interest
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  COMMUNITY_POST {
    string id PK
    string org_id FK
    string staff_id FK
    string title
    string content
    string image
    jsonb tags
    int likes
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  FINANCIAL_REPORT {
    string id PK
    string org_id FK
    string type
    jsonb data
    timestamptz period
    timestamptz created_at
    timestamptz updated_at
    timestamptz deleted_at
  }
  SESSION {
    string id PK
    string user_id FK
    string refresh_token_hash
    timestamptz created_at
    timestamptz expires_at
    string ip_address
    string user_agent
    bool revoked
    timestamptz revoked_at
  }
  ROLE {
    string id PK
    string name
    string description
  }
  USER_ROLE {
    string user_id FK
    string role_id FK
    string org_id FK
    PRIMARY KEY (user_id, role_id, org_id)
  }
```

---

## 2. API Spec (Production-Ready)

- ทุก endpoint ต้องมี version (`/api/v1/...`)
- Response format (success/error):
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "...",
    "details": { ... }
  }
}
```
- ทุก endpoint รองรับ pagination/filter/sort/embed (ถ้าเป็น list)
- Error code/structure ชัดเจน
- Auth: JWT RS256, refresh token, HttpOnly cookie, RBAC, scope, session revoke, audit log
- ทุก endpoint ระบุ role/scope ที่เข้าถึงได้
- ตัวอย่าง endpoint:

```
GET /api/v1/patients?page=1&pageSize=20&search=...&status=active
POST /api/v1/patients
GET /api/v1/patients/{id}
PATCH /api/v1/patients/{id}
DELETE /api/v1/patients/{id}

GET /api/v1/appointments?patientId=...&date=...&status=...
POST /api/v1/appointments
...
```
- ทุก endpoint มี OpenAPI/Swagger spec file
- มี rate limit, caching header, monitoring, logging, audit
- ใช้ PATCH สำหรับ partial update
- มี embed/expand resource (เช่น `?embed=appointments,prescriptions`)
- ทุก endpoint มี validation (Joi/Zod)

---

## 3. Module Structure (Features)

```
features/
  patient/
    patient.model.ts
    patient.controller.ts
    patient.service.ts
    patient.validation.ts
    patient.routes.ts
  appointment/
    ...
  prescription/
    ...
  transaction/
    ...
  branch/
    ...
  staff/
    ...
  inventory/
    ...
  loan/
    ...
  community/
    ...
  financial/
    ...
  auth/
    auth.controller.ts
    auth.service.ts
    auth.validation.ts
    auth.routes.ts
middlewares/
  auth.middleware.ts
  rbac.middleware.ts
  errorHandler.ts
  audit.middleware.ts
config/
  db.ts
  jwt.ts
  rbac.ts
utils/
  logger.ts
  hash.ts
  ...
```

---

## 4. Best Practices (Production)

- ใช้ OpenAPI/Swagger spec file (sync กับ code จริง)
- มี test (unit/integration/e2e)
- มี migration script (เช่น Prisma, Knex, TypeORM, SQL)
- มี monitoring/logging (เช่น Winston, Datadog, Sentry)
- มี rate limit (เช่น express-rate-limit)
- มี caching (Redis, HTTP cache header)
- มี soft delete, audit log, security field ทุก table
- RBAC/Scope/Org isolation ทุก endpoint
- ใช้ PATCH สำหรับ partial update, PUT สำหรับ replace
- Response format เดียวกันทั้งระบบ
- Error handling ครบถ้วน
- ทุก endpoint มี validation (Joi/Zod)
- ทุก secret เก็บใน Secret Manager
- JWT ใช้ RS256, key rotation, exp สั้น, refresh token, session revoke
- Logging ทุก action สำคัญ, audit log ทุกการเปลี่ยนแปลง
- มี doc ให้ dev ทุกคนเข้าถึง (Swagger, Markdown, Postman)

---

> **หมายเหตุ:**
- ถ้าต้องการตัวอย่าง schema, OpenAPI, หรือ migration script สำหรับแต่ละ feature แจ้งได้เลย! 