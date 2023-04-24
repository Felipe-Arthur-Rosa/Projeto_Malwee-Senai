const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('delivery', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        fkproduct : {
            type : Sequelize.INTEGER(),
            allowNull : false,
        },
        price : {
            type : Sequelize.INTEGER(),
            allowNull : false,
        },
        porcent : {
            type : Sequelize.INTEGER(),
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
    })
}
