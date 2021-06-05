const { Pool } = require('pg')

const pool = new Pool({
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    database: String(process.env.DB_DATABASE),
    user: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD)
})

const createRepository = async (title, author, lang, descr, stars) => {
    await pool.query(`INSERT INTO repositories(title, author, lang, descr, stars) VALUES('${title}', '${author}', '${lang}', '${descr}', ${stars});`)
};

const deleteRepository = async (id) => {
    await pool.query(`DELETE FROM repositories WHERE id = ${id};`)
};

const getRepositories = async () => {
    try {
        const result = await pool.query('SELECT * FROM repositories;')
        return result.rows
    } catch(error) {
        console.log(error)
    }
};

module.exports = { pool, createRepository, getRepositories, deleteRepository };