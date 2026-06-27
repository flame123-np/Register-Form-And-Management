# Register Form & Management System

ระบบฟอร์มลงทะเบียนและจัดการข้อมูลผู้ใช้งาน (ภาษาไทย หรือคำอธิบายสั้นๆ เกี่ยวกับโปรเจกต์ของคุณ เช่น: ระบบที่ช่วยให้ผู้ใช้สามารถสมัครสมาชิก และให้ผู้ดูแลระบบจัดการข้อมูลผู้ใช้งานได้ผ่านหน้าเว็บ)

---

## 🚀 ฟีเจอร์การทำงาน (Features)
* **ระบบลงทะเบียน:** หน้าฟอร์มสำหรับให้ผู้ใช้งานกรอกข้อมูลเพื่อสมัครสมาชิก
* **ระบบจัดการผู้ใช้งาน:** หน้าจอสำหรับแสดงผล แก้ไข หรือลบข้อมูลผู้ใช้งาน (CRUD Operations)
* **Containerization:** รองรับการจำลองสภาพแวดล้อมด้วย Docker เพื่อให้ง่ายต่อการติดตั้งและใช้งาน

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

### Frontend (ส่วนหน้าบ้าน)
* **HTML5 / CSS3:** ใช้สร้างโครงสร้างและตกแต่งหน้าตาเว็บฟอร์ม (`index.html`, `style.css`, `user.html`)
* **JavaScript (Vanilla JS):** ใช้จัดการ Logic ฝั่งหน้าบ้านและการส่งข้อมูล (API Request)

### Backend (ส่วนหลังบ้าน)
* **Node.js & Express:** (หรือ Framework ที่คุณใช้ในโฟลเดอร์ server) สำหรับสร้าง API ในการรับ-ส่งข้อมูล

### Database & Tools (ฐานข้อมูลและเครื่องมือ)
* **MySQL / PostgreSQL:** (ระบุตามที่เขียนในไฟล์ `user.sql`) สำหรับจัดเก็บข้อมูลผู้ใช้งาน
* **Docker & Docker Compose:** สำหรับจัดการ Container ของระบบและฐานข้อมูลให้ทำงานร่วมกันได้อย่างง่ายดาย

---

## 📦 วิธีการติดตั้งและรันโปรเจกต์ (Installation & Setup)

### สิ่งที่ต้องมีในเครื่อง (Prerequisites)
* [Docker](https://www.docker.com/) และ Docker Compose
* [Node.js](https://nodejs.org/) (กรณีต้องการรันแบบไม่ผ่าน Docker)

### ขั้นตอนการรันด้วย Docker 

1. คลอนโปรเจกต์ลงมาที่เครื่อง:
   ```bash
   git clone [https://github.com/flame123-np/Register-Form-And-Management.git](https://github.com/flame123-np/Register-Form-And-Management.git)
   cd Register-Form-And-Management
2. สั่งรันระบบผ่าน Docker Compose:
   ```bash
   docker-compose up -d
4. เข้าใช้งานผ่านเบราว์เซอร์:
   * หน้าเว็บสำหรับผู้ใช้งาน: http://localhost:XXXX (เปลี่ยน XXXX เป็น Port ที่ตั้งไว้ใน docker-compose)

---

## 📂 โครงสร้างไฟล์ที่สำคัญ (Project Structure)

* `server/` : โค้ดส่วนหลังบ้าน (Backend API)
* `index.html` : หน้าแรก / ฟอร์มลงทะเบียนหลัก
* `user.html` / `user.js` : หน้าสำหรับจัดการข้อมูลผู้ใช้งาน
* `user.sql` : ไฟล์สำหรับจำลองตารางในฐานข้อมูล
* `docker-compose.yml` : ไฟล์ตั้งค่าการรันโปรเจกต์ด้วย Docker
