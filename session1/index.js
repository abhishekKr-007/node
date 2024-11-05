const http = require("http");
const PORT = 8082;

const server = http.createServer((req, res) => {
  //res.writeHead(200, { "Content-Type": "application/json" });
  //   res.write("Hello World\n");
  //   res.write("My name is Aditya\n");
  // res.end("I love teaching!");
  //   res.end(
  //     JSON.stringify({
  //       message: "Hello",
  //     })
  //   );

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>HTTP SERVER</h1>");
});

server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
