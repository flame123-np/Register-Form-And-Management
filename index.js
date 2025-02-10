// import http module เพื่อสร้าง server
const http = require('http');

const host = 'localhost'; // กำหนด host ที่ sever จะรอรับ request
const port = 8000 // กำหนด post ที่จะใช้


// กำหนดค่าเริ่มต้นของ sever
const requestListener = function (req, res) {
  res.writeHead(200); // ส่ง status code 200 กลับไปให้ client
  res.end('Hello, World!\n'); // ส่ง response กลับไปให้ client
}

const server = http.createServer(requestListener); // สร้าง server โดยใช้ http.createServer โดยส่ง requestListener ไปเป็น callback function
   server.listen(port, host, () => { // กำหนด port และ host ที่ server จะ listen และใช้ callback function เพื่อทำงานเมื่อ server เริ่มทำงาน
    console.log(`Server is running on http://${host}:${port}`); // แสดงข้อความเมื่อ server เริ่มทำงาน
    })