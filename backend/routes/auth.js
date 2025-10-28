const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require('../db'); 

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const q = await pool.query(
      `INSERT INTO users(email,username,password)
       VALUES ($1,$2,$3)
       RETURNING id,email,username,created_at`,
      [email, username, password]
    );

    res.json(q.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const q = await pool.query(
      `SELECT id,email,username,password,created_at 
       FROM users 
       WHERE email=$1`,
      [email]
    );

    const u = q.rows[0];
    if (!u || u.password !== password)
      return res.status(400).send("Invalid login");

    const token = jwt.sign(
      { id: u.id, email: u.email, username: u.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    delete u.password;
    res.json({ token, user: u });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
