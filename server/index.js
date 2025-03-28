const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let conn = null;
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8830
  });
};

const validateData = (userData) => {
  let errors = [];
  if (!userData.firstname) errors.push('กรุณากรอกชื่อ');
  if (!userData.lastname) errors.push('กรุณากรอกนามสกุล');
  if (!userData.age) errors.push('กรุณากรอกอายุ');
  if (!userData.gender) errors.push('กรุณาเลือกเพศ');
  if (!userData.interests || userData.interests.length === 0) errors.push('กรุณาเลือกความสนใจ');
  if (!userData.description) errors.push('กรุณากรอกข้อมูล');
  return errors;
};

// GET: ดึง user ทั้งหมด
app.get('/users', async (req, res) => {
  const results = await conn.query('SELECT * FROM `user`');
  res.json(results[0]);
});

// POST: สร้าง user ใหม่
app.post('/users', async (req, res) => {
  try {
    let user = req.body;

    const errors = validateData(user);
    if (errors.length > 0) {
      throw {
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        errors: errors
      };
    }

    // 🔥 แปลง interests จาก array → string
    if (Array.isArray(user.interests)) {
      user.interests = user.interests.join(',');
    }

    const results = await conn.query('INSERT INTO `user` SET ?', user);
    res.json({
      message: "Create user successfully",
      data: results[0]
    });
  } catch (error) {
    const errorMessages = error.message || 'Something went wrong';
    const errors = error.errors || [];
    console.error('error message:', error.message);
    res.status(500).json({
      message: errorMessages,
      errors: errors
    });
  }
});

// GET: ดึง user ตาม id
app.get('/users/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query('SELECT * FROM `user` WHERE id = ?', id);
    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'User not found' };
    }
    res.json(results[0][0]);
  } catch (error) {
    console.error('error:', error.message);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

// PUT: แก้ไข user ตาม id
app.put('/users/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let updateUser = req.body;

    // 🔥 แปลง interests จาก array → string
    if (Array.isArray(updateUser.interests)) {
      updateUser.interests = updateUser.interests.join(',');
    }

    const results = await conn.query(
      'UPDATE `user` SET ? WHERE id = ?',
      [updateUser, id]
    );
    res.json({
      message: "Update user successfully",
      data: results[0]
    });
  } catch (error) {
    console.error('error:', error.message);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

// DELETE: ลบ user ตาม id
app.delete('/users/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query('DELETE FROM `user` WHERE id = ?', id);
    res.json({
      message: "Delete user successfully",
      data: results[0]
    });
  } catch (error) {
    console.error('error:', error.message);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

app.listen(port, async () => {
  await initMySQL();
  console.log('http server is running on port' + port);
});
