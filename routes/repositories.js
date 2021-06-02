const express = require('express')
const fetch = require('node-fetch')
const { parse } = require('node-html-parser')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const response = await fetch('https://github.com/trending', { method: 'GET' })
        const html = await response.text()

        const root = parse(html)

        res.send(root.querySelectorAll('.Box-row').toString())
        res.end()
    } catch(error) {
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

module.exports = router