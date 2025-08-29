const express = require("express");
const rotaLivro = require("./rotas/livro");
const app = express();
app.use(express.json());
app.use("/livros", rotaLivro);
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World! is We guys!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
