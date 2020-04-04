'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      create table rounds (
        id uuid unique not null DEFAULT uuid_generate_v1() primary key,
        game_id uuid references games,
        category varchar
      );
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      drop table rounds;
    `)
  }
};
