'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      create table games (
        id uuid unique not null DEFAULT uuid_generate_v1() primary key,
        name varchar,
        instructions varchar,
        subjects text[][],
        categories text[][],
        submissions_start_at timestamptz,
        submissions_end_at timestamptz,
        completed_at timestamptz
      );
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      drop table games;
    `)
  }
};
