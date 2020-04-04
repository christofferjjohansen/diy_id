'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      create table games (
        id uuid unique not null DEFAULT uuid_generate_v1() primary key,
        name varchar,
        instructions varchar,
        number_of_photos integer,
        categories text[][],
        starts_at timestamptz,
        ends_at timestamptz
      );
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      drop table games;
    `)
  }
};
