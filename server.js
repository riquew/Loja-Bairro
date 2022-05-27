const express = require("express");
const users = require("./models/dbHelpers")
const produtos_estoque = require("./models/dbHelpers")
//const methodOverride = require('method-override')

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
//app.use(methodOverride('__method'))

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.get('/cadastro', function(req, res){
    res.sendFile(__dirname + "/cadastro.html")
});

app.post('/cadastro', function(req, res){
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    let nascimento = req.body.nascimento;
    let cpf = req.body.cpf;
    let cep = req.body.cep;
    let logradouro = req.body.logradouro;
    let cidade = req.body.cidade;
    let estado = req.body.estado;
    let user = {
                'nome': nome,
                'email': email,
                'senha': senha,
                'nascimento': nascimento,
                'cpf': cpf,
                'cep': cep,
                'logradouro': logradouro,
                'cidade': cidade,
                'estado': estado,
    }
    users.addUser(user);
    res.sendFile(__dirname + "/cadastro_concluido.html")
});

app.get('/login', function(req, res){
    res.sendFile(__dirname + "/login.html")
});

app.post('/login', function(req, res){
    let email = req.body.email;
    let senha = req.body.senha;
    let userAuthentication = {
        'email': email,
        'senha': senha, 
    }
    let authentication = users.findUser(userAuthentication)
    console.log(authentication)
    res.redirect('/')

})


app.get('/prod', function(req, res){
    res.sendFile(__dirname + "/cadastro_produto.html")
});

app.post('/prod', function(req, res){
    let nomeProduto = req.body.nome;
    let preco = req.body.preco;
    let quantidade = req.body.quantidade;
    let descricao = req.body.descricao;
    let imagem = req.body.imagem;
    let produto = {
        'nome': nomeProduto,
        'preco': preco,
        'quantidade': quantidade,
        'descricao': descricao,
        'imagem': imagem,
    }
    produtos_estoque.addProd(produto);
    res.sendFile(__dirname + "/cadastro_produto_concluido.html")
})

app.get('/prod/:id', function(req, res){
    const {id} = req.params;

    produtos_estoque.findById(id)
    .then(produto => {
       if (produto){
        res.status(200).json({produto})
       } else {
        res.status(404).json({message: 'Produto não cadastrado.'})
       }
    }).catch(error => {
        res.status(500).json({message: 'Não foi possivel concluir a solicitação.'})
    })

})

app.delete('/prod/:id', function(req, res){
    const {id} = req.params;

    produtos_estoque.removeById(id)
    .then(produto => {
        if (produto > 0) {
            res.status(200).json({message: 'Produto deletado.'})
        } else {
            res.status(404).json({message: 'Produto não cadastrado.'})
        }
    }).catch(error => {
        res.status(500).json({message: 'Não foi possivel concluir a solicitação.'})
    })
    }
)

app.patch('/prod/:id', function(req,res){
    const {id} = req.params;
    const changes = req.body

    produtos_estoque.updateById(id, changes)
    .then(produto => {
        if (produto) {
            res.status(200).json({produto})
        } else {
            res.status(404).json({message: 'Produto não cadastrado.'})
        }
    }).catch(error => {
        res.status(500).json({message: 'Não foi possivel concluir a solicitação.'})
    })
})


app.listen(3000, () =>{
    console.log("server started at 3000")
});