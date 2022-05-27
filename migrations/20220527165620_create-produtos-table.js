/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('produtos_estoque', tbl => {
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
    return knex.schema.dropTableIfExists('produtos')  
};
