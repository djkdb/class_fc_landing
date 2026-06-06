const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

function sign(payload) { // JWT 토큰 발급
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

function auth(req, res, next) { // 토큰 검증
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: "no token" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "bad token" });
  }
}

function optionalAuth(req, res, next) { // 토큰 있으면 담고 없으면 넘기기
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (token) {
    try {
      req.user = jwt.verify(token, SECRET);
    } catch {}
  }
  next();
}

function adminOnly(req, res, next) { // 관리자만 접근
  if (req.user && req.user.role === "admin") return next();
  res.status(403).json({ error: "admin only" });
}

module.exports = { sign, auth, optionalAuth, adminOnly };
