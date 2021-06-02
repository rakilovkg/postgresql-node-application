const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

pool.connect()

const createRepository = async () => {

};

const updateRepository = async (id) => {

};

const readRepositories = async () => {
    const result = await pool.query('SELECT * FROM repositories;')
    return result.rows;
};

module.exports = { getUsers };