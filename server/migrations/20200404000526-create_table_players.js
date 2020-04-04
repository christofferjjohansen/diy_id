'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      create table submissions (
        id uuid unique not null DEFAULT uuid_generate_v1() primary key,
        game_id uuid references games,
        player_id uuid references players,
        notes varchar,
        score integer
      );
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      drop table submissions;
    `)
  }
};
