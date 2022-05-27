const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
    addUser,
    findUser,
    addProd,
    findById,
    removeById,
    updateById,
};

async function addUser(users) {
    console.log(users)
    const [id] = await db('users').insert({
        'nome': users.nome,
        'email': users.email,
        'senha': users.senha,
        'nascimento': users.nascimento,
        'cpf': users.cpf,
        'cep': users.cep,
        'logradouro': users.cep,
        'cidade': users.cidade,
        'estado': users.estado,
    })
    return id
}


function findUser(users) {
    const user = db('users').select('email', 'senha').where('email', users.email).where('senha', users.senha).then(data =>{
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
}

async function addProd(produtos) {
    console.log(produtos)
    const [id] = await db('produtos_estoque').insert({
        'nome': produtos.nome,
        'preco': produtos.preco,
        'quantidade': produtos.quantidade,
        'descricao': produtos.descricao,
        'imagem': produtos.imagem,
    })
}

function findById(id){
    return db('produtos_estoque').where('id', id).first();
}

function removeById(id){
    return db('produtos_estoque').where('id', id).del();
}

function updateById(id, changes){
    return (
        db('produtos_estoque').where('id', id).update('changes')
    )
}