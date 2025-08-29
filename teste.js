const fs = require("fs");

const dadosAtuais = JSON.parse(fs.readFileSync("livros.json"));
console.log(dadosAtuais);
const novoLivro = {
  id: "3",
  nome: "Livro super legal",
};

fs.writeFileSync("livros.json", JSON.stringify([...dadosAtuais, novoLivro]));

console.log(JSON.parse(fs.readFileSync("livros.json")));
