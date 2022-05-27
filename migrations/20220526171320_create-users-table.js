/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.text('nome', 100)
        tbl.text('email', 100)
        tbl.text('senha', 100)
        tbl.date('nascimento')
        tbl.text('cpf', 11)
        tbl.text('cep', 8)
        tbl.text('logradouro', 100)
        tbl.text('cidade', 80)
        tbl.text('estado', 40)
    }).createTable('produtos', tbl => {
      tbl.increments()
      tbl.text('nome', 100)
      tbl.double('preco')
      tbl.integer('quantidade')
      tbl.text('descricao', 500)
      tbl.text('imagem', 500)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('produtos')
};
