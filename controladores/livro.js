const {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  removeLivro,
} = require("../servicos/livro");

function getLivros(req, res) {
  try {
    const livros = getTodosLivros();
    res.send(livros);
  } catch (error) {
    res.status(500).send("Error retrieving books");
  }
}

function getLivro(req, res) {
  try {
    const id = req.params.id;
    if (!id || Number.isNaN(Number(id))) {
      return res.status(422).send("Invalid book ID");
    } else {
      const livro = getLivroPorId(id);
      if (!livro) {
        return res.status(404).send("Book not found");
      }
      res.send(livro);
    }
  } catch (error) {
    res.status(500).send("Error retrieving book by ID");
  }
}

function postLivro(req, res) {
  try {
    const novoLivro = req.body;
    if (req.body.nome) {
      insereLivro(novoLivro);
      res.status(201).send("Book added to the alura!");
    } else {
      res.status(422).send("Invalid book data, missing 'nome' field");
    }
  } catch (error) {
    res.status(500).send("Error adding book");
  }
}

function patchLivro(req, res) {
  try {
    const id = req.params.id;
    if (!id || Number.isNaN(Number(id))) {
      return res.status(422).send("Invalid book ID");
    } else {
      const modificacoes = req.body;
      modificaLivro(modificacoes, id);
      res.send("Book modified successfully");
    }
  } catch (error) {
    res.status(500).send("Error modifying book");
  }
}

function deleteLivro(req, res) {
  try {
    const id = req.params.id;
    if (!id || Number.isNaN(Number(id))) {
      return res.status(422).send("Invalid book ID");
    } else {
      const livro = getLivroPorId(id);
      if (!livro) {
        return res.status(404).send("Book not found");
      }
      removeLivro(id);
      res.send("Book deleted successfully");
    }
  } catch (error) {
    res.status(500).send("Error deleting book");
  }
}

module.exports = {
  getLivros,
  getLivro,
  postLivro,
  patchLivro,
  deleteLivro,
};
