import { Sequelize, DataTypes } from "sequelize";

//const { Sequelize, DataTypes } = require("sequelize");

import { sequelize_config } from '../config/config';

export const Users = sequelize_config.define('users', {
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