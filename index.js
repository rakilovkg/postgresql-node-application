require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use('/', require('./routes/repositories'))

async function start() {
    const PORT = process.env.APP_PORT || 5000

    try {
        app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
    } catch(error) {
        await client.end()
        process.exit(1)
    }
}

start()