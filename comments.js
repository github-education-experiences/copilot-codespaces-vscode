// Create web server
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Copilot course!\n");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
