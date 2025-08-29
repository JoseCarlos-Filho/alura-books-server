const fs = require("fs");

function getTodosLivros() {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  return livros;
}

function getLivroPorId(id) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const livroFiltrado = livros.find((livro) => livro.id === id);
  return livroFiltrado;
}

function insereLivro(novoLivro) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const novaListaDeLivros = [...livros, novoLivro];
  fs.writeFileSync("livros.json", JSON.stringify(novaListaDeLivros));
}

function modificaLivro(modificacoes, id) {
  const livrosAtuais = JSON.parse(fs.readFileSync("livros.json"));
  const indiceModificado = livrosAtuais.findIndex((livro) => livro.id === id);
  if (indiceModificado !== -1) {
    const conteudoModificado = {
      ...livrosAtuais[indiceModificado],
      ...modificacoes,
    };
    livrosAtuais[indiceModificado] = conteudoModificado;
    fs.writeFileSync("livros.json", JSON.stringify(livrosAtuais));
  }
}

function removeLivro(id) {
  const livrosAtuais = JSON.parse(fs.readFileSync("livros.json"));
  const novaListaDeLivros = livrosAtuais.filter((livro) => livro.id !== id);
  fs.writeFileSync("livros.json", JSON.stringify(novaListaDeLivros));
}

module.exports = {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  removeLivro,
  modificaLivro,
};
