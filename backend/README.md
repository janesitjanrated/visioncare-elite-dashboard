# Solo Optics Oasis – Backend Developer Guide

---

## 1. System Overview

### Authentication & Authorization Flow

1. **User Login**: ผู้ใช้ส่ง email/password ไปที่ `/auth/login`
2. **JWT Issuance**: ระบบตอบกลับ access_token (JWT, RS256) + refresh_token (HttpOnly cookie)
3. **JWT Middleware**: ทุก request ที่ต้องการ auth ต้องแนบ JWT ใน header
4. **RBAC Middleware**: ตรวจสอบ scope/permission จาก JWT (ไม่ใช้ role ตายตัว)
5. **orgContext Middleware**: ดึง org_id จาก JWT inject เข้า req ทุกครั้ง
6. **Service Layer**: ทุก query ต้อง filter ด้วย org_id
7. **Audit Logging**: ทุก action สำคัญ (CRUD, login, permission change) ต้อง log audit

---

## 2. How to Add a New Endpoint

1. **Define Schema**
   - ออกแบบ table schema (PostgreSQL)
   - เพิ่ม migration script ใน `/supabase/migrations/`

2. **Write OpenAPI Spec**
   - ระบุ endpoint, method, parameters, request/response schema
   - ระบุ error format กลาง (ดูตัวอย่างด้านล่าง)

3. **Implement Code**
   - สร้างไฟล์ใน `src/features/<feature>/`
     - controller, service, validation, model, routes
   - ใช้ Joi หรือ Zod สำหรับ validation
   - Middleware:
     - JWT/Session, RBAC, orgContext
   - Service:
     - Query ต้อง filter ด้วย org_id
     - รองรับ embed resource ถ้ามี (เช่น ?embed=patient,staff)
   - Logging:
     - logAudit ทุก action สำคัญ

4. **Write Test**
   - Unit test (service, validation)
   - Integration test (endpoint, data isolation, error, audit)
   - Mock JWT, org_id, DB

5. **Update Docs**
   - เพิ่ม spec ใน `PRODUCTION_BACKEND_FULL_SPEC.md`
   - อัพเดต README/dev-docs

---

## 3. How to Test & Run

### Run Development Server
```bash
cd backend
npm install
npm run dev
```

### Run Tests
```bash
npm run test
```

### Mock JWT/org_id
- ใช้ mock middleware หรือ JWT test token
- ตัวอย่าง mock JWT payload:
  ```json
  {
    "sub": "user_id",
    "org_id": "org_id",
    "scope": ["patient:read", "appointment:create"],
    ...
  }
  ```
- ใช้ test DB หรือ in-memory DB สำหรับ integration test
- มี script สำหรับ seed ข้อมูล

---

## 4. Naming Convention & Folder Structure

### Folder Structure
```
backend/
  src/
    features/
      <feature>/
        <feature>.controller.ts
        <feature>.service.ts
        <feature>.model.ts
        <feature>.validation.ts
        <feature>.routes.ts
    middlewares/
    utils/
    config/
    server.ts
```

### Naming
- snake_case สำหรับ DB field
- camelCase สำหรับ JS/TS
- ชื่อไฟล์/คลาส/ฟังก์ชันต้องสื่อความหมาย
- แยกไฟล์ตามชั้น (SRP)

---

## 5. Error Format

ทุก error ต้องใช้ format กลาง:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Name is required",
    "field": "name"
  }
}
```
- Error code registry: เก็บไว้ใน enum/constant
- ทุก endpoint ต้องใช้ code นี้

---

## 6. Example: Add New Feature (Step-by-step)

1. **สร้าง schema + migration**
   - เขียน SQL migration ใน `/supabase/migrations/`
2. **เพิ่ม OpenAPI spec**
   - ระบุใน `PRODUCTION_BACKEND_FULL_SPEC.md`
3. **สร้าง controller/service/validation/model/routes**
   - ใน `src/features/<feature>/`
4. **เพิ่ม middleware (RBAC, orgContext)**
   - ระบุ scope ที่ต้องการใน route
5. **เขียน test (mock JWT/org_id)**
   - ทดสอบ data isolation, error, audit
6. **logAudit ทุก action สำคัญ**
   - เรียก helper logAudit ใน service
7. **อัพเดต spec + README**

---

## 7. FAQ

**Q: จะ mock JWT/org_id ยังไง?**  
A: ใช้ test token หรือ mock middleware inject req.user/org_id

**Q: จะ test data isolation ยังไง?**  
A: สร้าง user หลาย org, ทดสอบว่าเห็นแต่ข้อมูล org ตัวเอง

**Q: จะ audit/log ยังไง?**  
A: เรียก logAudit ในทุก action สำคัญ

---

## 8. Reference

- [PRODUCTION_BACKEND_FULL_SPEC.md](./PRODUCTION_BACKEND_FULL_SPEC.md)
- ตัวอย่าง middleware, audit, embed, error, monitoring, test (ขอเพิ่มได้)

---

**หมายเหตุ:**  
- ทุก feature ใหม่ต้อง enforce security, org isolation, audit, error format, test  
- ถ้าสงสัยหรือไม่แน่ใจ flow ให้ถาม reviewer หรือดูตัวอย่างใน spec 