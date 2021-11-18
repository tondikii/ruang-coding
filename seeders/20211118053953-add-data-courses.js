'use strict';
const fs =  require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data = JSON.parse(fs.readFileSync('./data/courses.json', 'utf-8')).map(el => {
      delete el.id
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })
    return queryInterface.bulkInsert('Courses', data, null);
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Courses', null);
  }
};
