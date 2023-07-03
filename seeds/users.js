/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').insert([
    {id: 1, name: 'Tom Jones'},
    {id: 2, name: 'Joe Bloggs'}
  ]);
};
