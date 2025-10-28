const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const r = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(r.rows);
  } catch {
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
