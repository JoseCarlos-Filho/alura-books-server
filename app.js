const express = require("express");
const rotaLivro = require("./rotas/livro");
const rotaFavorito = require("./rotas/favorito");

const cors = require("cors");

const app = express();
app.use(express.json()); // Adiciona o middleware para fazer o parse de corpos de requisição JSON
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/livros", rotaLivro);
app.use("/favoritos", rotaFavorito);

const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World! is We guys!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
