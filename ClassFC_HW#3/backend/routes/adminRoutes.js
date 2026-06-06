const express = require("express");
const { pool } = require("../db");
const { auth, adminOnly } = require("../auth");

const router = express.Router();

router.use(auth, adminOnly);

router.get("/accounts", async (req, res) => { // 전체 계정 조회
  const [rows] = await pool.query(
    `SELECT id, username, name, number, email, role,
            DATE_FORMAT(joined_at, '%Y-%m-%dT%H:%i:%s') AS joinedAt
     FROM accounts ORDER BY joined_at DESC`
  );
  res.json(rows);
});

router.delete("/accounts/:id", async (req, res) => { // 계정 삭제
  await pool.query("DELETE FROM accounts WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
});

router.put("/accounts/:id/role", async (req, res) => { // 계정 권한 변경
  const { role } = req.body || {};
  if (role !== "admin" && role !== "member") return res.status(400).json({ error: "invalid role" });
  await pool.query("UPDATE accounts SET role = ? WHERE id = ?", [role, req.params.id]);
  res.json({ ok: true });
});

router.get("/rsvp-summary", async (req, res) => { // 참석 현황 조회
  const [rows] = await pool.query(
    `SELECT r.match_id AS matchId, r.status, a.name, a.number, a.username
     FROM rsvp r JOIN accounts a ON a.id = r.account_id`
  );
  const byMatch = {};
  for (const r of rows) {
    if (!byMatch[r.matchId]) byMatch[r.matchId] = { attend: [], late: [] };
    byMatch[r.matchId][r.status].push({ name: r.name, number: r.number, username: r.username });
  }
  res.json(byMatch);
});

module.exports = router;
