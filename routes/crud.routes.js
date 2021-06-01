const express = require('express')

const router = express.Router()

const client = require('../client')

router.get('/', async (req, res) => {
    try {
        
    } catch(error) {
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

router.post('/', async () => {
    
})

router.delete('/', async () => {
    
})

module.exports = router