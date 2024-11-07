const express = require("express");
const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("./controllers/currencies.controllers");
const PORT = 8082;

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

app.get("/currencies", getCurrencies);

app.get("/currencies/:symbol", getCurrencyBySymbol);

// app.get("/users/:userId/posts/:postId/comments/:commentId", (req, res) => {
//   console.log(req.params);
//   res.send("dummy response");
// });

app.listen(PORT, () => {
  console.log(`Server lisenting on PORT:${PORT}`);
});
