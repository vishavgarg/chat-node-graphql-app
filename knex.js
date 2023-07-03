const knexConfig = require('./knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(knexConfig);
const { Model } = require('objection');

Model.knex(knex);

module.exports = { knex };
