'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Переименование столбца `name` на `username`
    await queryInterface.renameColumn('Users', 'name', 'username');

    // Добавление новых столбцов `firstname` и `lastname`
    await queryInterface.addColumn('Users', 'firstname', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'lastname', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Удаление новых столбцов `firstname` и `lastname`
    await queryInterface.removeColumn('Users', 'firstname');
    await queryInterface.removeColumn('Users', 'lastname');

    // Переименование столбца `username` обратно на `name`
    await queryInterface.renameColumn('Users', 'username', 'name');
  }
};
