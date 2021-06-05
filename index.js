require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const exphbs = require('express-handlebars')

const { pool } = require('./database.js')

const app = express()

app.use(cors())

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.set('views', 'views')
app.set('view engine', 'hbs')

app.engine('hbs', hbs.engine)

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(require('./routes/repositories'))

async function start() {
    const PORT = process.env.APP_PORT || 5000

    try {
        await pool.connect()
        app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
    } catch(error) {
        console.log(error)
        await pool.end()
        process.exit(1)
    }
}

start()