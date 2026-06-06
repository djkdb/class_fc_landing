// REACT_APP_API_BASE 환경변수로 로컬 백엔드 오버라이드 가능
// 예: REACT_APP_API_BASE=http://127.0.0.1:3001 npm start
const API_BASE =
  process.env.REACT_APP_API_BASE || "https://classfc-api.onrender.com";

export default API_BASE;
