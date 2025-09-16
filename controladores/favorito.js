const {
  getTodosFavoritos,
  deletaFavoritoPorId,
  insereFavorito,
} = require("../servicos/favorito");

function getFavoritos(req, res) {
  try {
    const livros = getTodosFavoritos();
    res.send(livros);
  } catch (error) {
    res.status(500).send("Error retrieving books");
  }
}

function postFavorito(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).send("Invalid book ID");
    }
    const resultado = insereFavorito(id);
    if (resultado.error) {
      return res.status(resultado.statusCode).send(resultado.message);
    }
    res.status(201).send("Book added to favorites!");
  } catch (error) {
    // Adiciona log do erro para facilitar a depuração
    console.error(error);
    res.status(500).send("Error adding favorite book");
  }
}

function deleteFavorito(req, res) {
  try {
    const id = req.params.id;
    if (id || Number(id)) {
      deletaFavoritoPorId(id);
      res.send("Book removed from favorites");
    } else {
      res.status(422).send("Invalid book ID");
    }
  } catch (error) {
    res.status(500).send("Error deleting favorite book");
  }
}

module.exports = {
  getFavoritos,
  postFavorito,
  deleteFavorito,
};
