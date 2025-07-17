// สคริปต์นี้ใช้ทดสอบทุก endpoint ที่พบในระบบ
// ต้องการ Node.js + axios
// วิธีใช้: node test_all_endpoints.js

const axios = require('axios');

const BASE_URL = 'http://localhost:9999';
// ทุก endpoint ต้องมี prefix /api ตาม routing จริง

// กำหนดข้อมูลทดสอบ (กรุณาใส่ข้อมูลจริงที่มีอยู่ในระบบ)
const testUser = {
  username: 'admin', // เปลี่ยนเป็น username จริง
  password: 'admin123' // เปลี่ยนเป็น password จริง
};
const testOrgId = 'org-id'; // เปลี่ยนเป็น org_id จริง
const testPatientId = 'patient-id'; // เปลี่ยนเป็น patient id จริง
const testAppointmentId = 'appointment-id'; // เปลี่ยนเป็น appointment id จริง
const testStaffId = 'staff-id'; // เปลี่ยนเป็น staff id จริง
const testBranchId = 'branch-id'; // เปลี่ยนเป็น branch id จริง
const testPrescriptionId = 'prescription-id'; // เปลี่ยนเป็น prescription id จริง

let jwtToken = '';

async function loginAndGetToken() {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, testUser);
    jwtToken = res.data.token || res.data.accessToken;
    console.log('Login success. Token:', jwtToken);
  } catch (err) {
    console.error('Login failed:', err.response ? err.response.data : err.message);
    process.exit(1);
  }
}

function authHeaders(extra = {}) {
  return {
    Authorization: `Bearer ${jwtToken}`,
    org_id: testOrgId,
    ...extra
  };
}

async function testEndpoint(method, url, data = {}, headers = {}) {
  try {
    const config = {
      method,
      url: BASE_URL + url,
      headers,
      data
    };
    const res = await axios(config);
    console.log(`[${method.toUpperCase()}] ${url} ->`, res.status, res.data);
  } catch (err) {
    if (err.response) {
      console.error(`[${method.toUpperCase()}] ${url} ->`, err.response.status, err.response.data);
    } else {
      console.error(`[${method.toUpperCase()}] ${url} ->`, err.message);
    }
  }
}

async function runTests() {
  await loginAndGetToken();

  // ตัวอย่าง endpoint (ต้องเติม id จริง)
  const endpoints = [
    // appointment
    { method: 'get', url: '/appointment', headers: authHeaders() },
    { method: 'post', url: '/appointment', data: { patient_id: testPatientId, date: '2025-07-18', time: '10:00' }, headers: authHeaders() },
    { method: 'get', url: `/appointment/${testAppointmentId}`, headers: authHeaders() },
    { method: 'patch', url: `/appointment/${testAppointmentId}`, data: { note: 'update test' }, headers: authHeaders() },
    { method: 'delete', url: `/appointment/${testAppointmentId}`, headers: authHeaders() },

    // organization
    { method: 'get', url: '/organization', headers: authHeaders() },
    { method: 'post', url: '/organization', data: { name: 'Test Org' }, headers: authHeaders() },
    { method: 'get', url: `/organization/${testOrgId}`, headers: authHeaders() },
    { method: 'patch', url: `/organization/${testOrgId}`, data: { name: 'Org Updated' }, headers: authHeaders() },
    { method: 'delete', url: `/organization/${testOrgId}`, headers: authHeaders() },

    // staff
    { method: 'get', url: '/staff', headers: authHeaders() },
    { method: 'post', url: '/staff', data: { name: 'Staff Test', role: 'doctor' }, headers: authHeaders() },
    { method: 'get', url: `/staff/${testStaffId}`, headers: authHeaders() },
    { method: 'patch', url: `/staff/${testStaffId}`, data: { name: 'Staff Updated' }, headers: authHeaders() },
    { method: 'delete', url: `/staff/${testStaffId}`, headers: authHeaders() },

    // branch
    { method: 'get', url: '/branch', headers: authHeaders() },
    { method: 'post', url: '/branch', data: { name: 'Branch Test' }, headers: authHeaders() },
    { method: 'get', url: `/branch/${testBranchId}`, headers: authHeaders() },
    { method: 'patch', url: `/branch/${testBranchId}`, data: { name: 'Branch Updated' }, headers: authHeaders() },
    { method: 'delete', url: `/branch/${testBranchId}`, headers: authHeaders() },

    // prescription
    { method: 'get', url: '/prescription', headers: authHeaders() },
    { method: 'post', url: '/prescription', data: { patient_id: testPatientId, medicine: 'TestMed' }, headers: authHeaders() },
    { method: 'get', url: `/prescription/${testPrescriptionId}`, headers: authHeaders() },
    { method: 'patch', url: `/prescription/${testPrescriptionId}`, data: { medicine: 'UpdatedMed' }, headers: authHeaders() },
    { method: 'delete', url: `/prescription/${testPrescriptionId}`, headers: authHeaders() },

    // เพิ่ม endpoint อื่นๆ ตามที่พบ เช่น /dashboard, /patient, /community, /loans, /inventory, /finance
    // ...
  ];

  for (const ep of endpoints) {
    await testEndpoint(ep.method, ep.url, ep.data, ep.headers);
  }
}

runTests();
