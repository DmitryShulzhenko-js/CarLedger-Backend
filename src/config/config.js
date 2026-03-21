const { Sequelize, DataTypes, QueryTypes } = require("sequelize");

const dotenv = require('dotenv');
dotenv.config();

const db_name = process.env.DB_NAME
const db_user = process.env.DB_USER
const db_password = process.env.DB_PASSWORD
const db_host = process.env.DB_HOST
const db_port = process.env.DB_PORT
const timezone = process.env.TIMEZONE

const sequelize_config = new Sequelize(db_name, db_user, db_password, {
    host: db_host,
    port: db_port,
    // host: process.env.POSTGRES_PORT_5432_TCP_ADDR,
    dialect: 'postgres',
    dialectOptions: { // for reading
        useUTC: false,
        timezone: timezone,
    },
    timezone: timezone, // for writing
    operatorsAliases: 1,
    logging: false,
    define: {
        timestamps: false,
        freeTableName: true,
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const modelSync = async (Model) => { // согласно переданной модели создает таблицу, если ее нет в БД
    // await Model.sync().then(() => { // надо проверить настройки функции
        console.log('The table for the model was just (re)created!')
    // }).catch(err => console.log(err))
};

module.exports = sequelize_config;