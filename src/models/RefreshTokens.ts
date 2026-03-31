import { Sequelize, DataTypes } from "sequelize";

//const { Sequelize, DataTypes } = require("sequelize");

import { sequelize_config } from '../config/config';

export const RefreshTokens = sequelize_config.define('refresh_tokens', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        field: 'id'
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id'
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'token'
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_at'
    },
    created_at: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updated_at: {
        type: DataTypes.DATE,
        field: 'updated_at'
    }
})