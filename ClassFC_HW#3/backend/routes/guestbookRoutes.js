const express = require("express");
const { pool } = require("../db");

const router = express.Router();

// GET /api/guestbook - 전체 방명록 조회
router.get("/", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, name, message, created_at FROM guestbook ORDER BY created_at DESC LIMIT 20"
  );
  res.json(rows);
});

// POST /api/guestbook - 새 방명록 글 등록
router.post("/", async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: "이름과 메시지를 입력해주세요." });
  }
  if (name.length > 30) {
    return res.status(400).json({ error: "이름은 30자 이하로 입력해주세요." });
  }
  if (message.length > 200) {
    return res.status(400).json({ error: "메시지는 200자 이하로 입력해주세요." });
  }

  const [result] = await pool.query(
    "INSERT INTO guestbook (name, message) VALUES (?, ?)",
    [name.trim(), message.trim()]
  );
  const [rows] = await pool.query(
    "SELECT id, name, message, created_at FROM guestbook WHERE id = ?",
    [result.insertId]
  );
  res.status(201).json(rows[0]);
});

module.exports = router;
