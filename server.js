const express = require("express");
const app = express();

app.use(express.json()); 


app.get("/", (req, res) => {
    res.send("API funcionando!");
});


let usuarios = [
    {id: 1, nome: "ana"},
    {id: 2, nome: "carla"},
    {id: 3, nome: "Gabi"},
    {id: 4, nome: "gigi"},
    {id: 5, nome: "barbara"}
];


app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

app.post("/usuarios", (req, res)=> {
    const novo = {
        id: usuarios.length + 1,
        nome: req.body.nome
    };
    usuarios.push(novo);
    res.status(201).json(novo)
})

//PUT - atualizar usuario
app.put("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json ({ erro: "Usuário não encontrado"});
    }

    usuario.nome = req.body.nome;
    res.json(usuario);
});

//DELETE - remover usuário
app.delete("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    usuarios = usuarios.filter(u => u.id !== id);
    res.json ({mensagem: "Usuário removido com sucesso"});
});


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});