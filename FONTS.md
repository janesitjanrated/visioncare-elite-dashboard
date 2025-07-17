# Font Configuration - Solo Optics Oasis

## ฟอนต์ที่ใช้ในระบบ

### 1. Inter
- **ใช้สำหรับ:** ข้อความภาษาอังกฤษ, UI elements, ตัวเลข, ข้อมูลทางการแพทย์
- **ลักษณะ:** ทันสมัย, อ่านง่าย, เหมาะกับ UI/UX
- **น้ำหนัก:** 300, 400, 500, 600, 700

### 2. Prompt
- **ใช้สำหรับ:** ข้อความภาษาไทย, หัวข้อภาษาไทย
- **ลักษณะ:** เรียบหรู, เป็นมิตร, เหมาะกับภาษาไทย
- **น้ำหนัก:** 300, 400, 500, 600, 700

## วิธีใช้งาน

### CSS Classes

```css
/* ข้อความภาษาอังกฤษ */
.font-english

/* ข้อความภาษาไทย */
.font-thai

/* หัวข้อภาษาไทย */
h1.thai, h2.thai, h3.thai, h4.thai, h5.thai, h6.thai

/* ข้อความภาษาไทยทั่วไป */
.thai-text
```

### Tailwind Classes

```jsx
// ฟอนต์ภาษาอังกฤษ (Inter)
className="font-sans"

// ฟอนต์ภาษาไทย (Prompt)
className="font-thai"

// น้ำหนักฟอนต์
className="font-light"    // 300
className="font-normal"   // 400
className="font-medium"   // 500
className="font-semibold" // 600
className="font-bold"     // 700
```

## ตัวอย่างการใช้งาน

### React Component

```jsx
// ข้อความภาษาอังกฤษ
<div className="font-sans font-medium">
  Patient Information
</div>

// ข้อความภาษาไทย
<div className="font-thai font-medium">
  ข้อมูลผู้ป่วย
</div>

// หัวข้อภาษาไทย
<h2 className="font-thai font-semibold text-xl">
  รายงานการตรวจตา
</h2>

// ตารางข้อมูล
<table className="font-sans">
  <thead>
    <tr>
      <th className="font-medium">Test</th>
      <th className="font-medium">Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Visual Acuity</td>
      <td>20/20</td>
    </tr>
  </tbody>
</table>
```

### ฟอร์มและ Input

```jsx
// Input ภาษาอังกฤษ
<input 
  className="font-sans font-normal"
  placeholder="Enter patient name"
/>

// Input ภาษาไทย
<input 
  className="font-thai font-normal"
  placeholder="กรอกชื่อผู้ป่วย"
/>

// Button
<button className="font-sans font-medium">
  Save Changes
</button>
```

## การตั้งค่า

### ไฟล์ที่เกี่ยวข้อง
- `index.html` - การโหลดฟอนต์จาก Google Fonts
- `tailwind.config.js` - การกำหนดค่า Tailwind CSS
- `src/styles/fonts.css` - CSS ตัวแปรและ utilities
- `src/styles/index.css` - การ import และการตั้งค่าพื้นฐาน

### การเพิ่มฟอนต์ใหม่
1. เพิ่ม link ใน `index.html`
2. กำหนดค่าใน `tailwind.config.js`
3. เพิ่ม CSS variables ใน `fonts.css`

## ข้อแนะนำ

1. **ใช้ Inter สำหรับ:**
   - ข้อความภาษาอังกฤษ
   - ตัวเลขและข้อมูลทางการแพทย์
   - UI elements และ navigation
   - Form labels และ placeholders

2. **ใช้ Prompt สำหรับ:**
   - ข้อความภาษาไทย
   - หัวข้อและชื่อส่วนต่างๆ
   - ข้อความอธิบายภาษาไทย
   - Error messages ภาษาไทย

3. **การผสมฟอนต์:**
   - ใช้ Inter เป็น fallback สำหรับ Prompt
   - หลีกเลี่ยงการเปลี่ยนฟอนต์บ่อยในหน้าเดียวกัน
   - ใช้ font-weight เพื่อสร้าง hierarchy

## การทดสอบ

เพื่อทดสอบว่าฟอนต์ทำงานถูกต้อง:

1. เปิด Developer Tools
2. ตรวจสอบ Network tab ว่าฟอนต์โหลดสำเร็จ
3. ตรวจสอบ Elements tab ว่าฟอนต์ถูกใช้ถูกต้อง
4. ทดสอบการแสดงผลทั้งภาษาไทยและภาษาอังกฤษ 