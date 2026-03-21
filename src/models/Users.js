const { Sequelize, DataTypes } = require("sequelize");

const db = require('../config/config.js');

const Users = db.define('users', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        //defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        field: 'id'
    },
    username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        field: 'username'
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'password'
    }
})

module.exports = Users;