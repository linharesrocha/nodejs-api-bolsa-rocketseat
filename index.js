const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const biblioteca = [];


app.get("/biblioteca", (req, res) => {
  if (biblioteca.length == 0) {
    return res.status(401).json({ error: "livros não encontrado!" })
  }
  return res.status(201).json(biblioteca);
});


app.post("/biblioteca", (req, res) => {
  const { nome, descricao } = req.body

  if (nome == null || descricao == null) {
    return res.status(400).json({ error: 'informe campos válidos!' })
  }

  const livro = {
    id: uuid(),
    nome,
    descricao,
  };

  biblioteca.push(livro);
  return res.status(201).json(livro);
});


app.put("/biblioteca/:id", (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  livrosIndex = biblioteca.findIndex((livro => livro.id === id));

  if (livrosIndex == -1) {
    return res.status(404).json({ error: "livro não encontrado!" });
  }

  const livro = {
    id: id,
    nome: nome,
    descricao: descricao,
  }

  biblioteca[livrosIndex] = livro;

  return res.status(201).json(livro);
});

app.delete("/biblioteca/:id", (req, res) => {
  const { id } = req.params;

  livrosIndex = biblioteca.findIndex((livro => livro.id === id));

  if (livrosIndex == -1) {
    return res.status(404).json({ error: "livro não encontrado!" });
  }

  biblioteca.splice(livrosIndex, 1);

  return res.status(204).send();
});

app.listen(3000);