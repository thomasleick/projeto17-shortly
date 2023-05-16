const allowedOrigins = [
  process.env.ORIGIN0,
  "http://www.google.com",
  "127.0.0.1:5500",
  "http://localhost:3500",
  "http://localhost:3000",
  "http://localhost:5173",
];

module.exports = allowedOrigins;
