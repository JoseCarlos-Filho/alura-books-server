const fs = require("fs");

function getTodosFavoritos() {
  const livrosFavoritos = JSON.parse(fs.readFileSync("favoritos.json"));
  return livrosFavoritos;
}

function deletaFavoritoPorId(id) {
  const livros = JSON.parse(fs.readFileSync("favoritos.json"));
  const livrosFiltrados = livros.filter((livro) => livro.id !== id);
  fs.writeFileSync("favoritos.json", JSON.stringify(livrosFiltrados));
  // return livrosFiltrados;
}

function insereFavorito(id) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const favoritos = JSON.parse(fs.readFileSync("favoritos.json"));

  const livroJaFavoritado = favoritos.find(
    (favorito) => favorito && favorito.id === id
  );
  if (livroJaFavoritado) {
    return {
      error: true,
      message: "Book is already in favorites",
      statusCode: 409, // Conflict
    };
  }

  const livroInserido = livros.find((livro) => livro.id === id);
  if (!livroInserido) {
    return {
      error: true,
      message: "Book not found",
      statusCode: 404,
    };
  }

  const novaListaDeLivrosFavoritos = [...favoritos, livroInserido];

  fs.writeFileSync(
    "favoritos.json",
    JSON.stringify(novaListaDeLivrosFavoritos)
  );
  return { error: false };
}

module.exports = {
  getTodosFavoritos,
  deletaFavoritoPorId,
  insereFavorito,
};
