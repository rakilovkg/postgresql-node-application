const express = require('express')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { getRepositories, createRepository, updateRepository, deleteRepository } = require('../database')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const repositories = await getRepositories()
        res.render('index', { isIndex: true, repositories })
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

router.get('/available', async (req, res) => {
    try {
        const response = await fetch('https://github.com/trending', { method: 'GET' })
        const html = await response.text()

        let repositories = []

        const $ = cheerio.load(html)

        $('.Box-row').each(function (i) {
            repositories.push({
                title: $(this).children().eq(1).children().eq(0).contents()[4].data.trim(),
                author: $(this).children().eq(1).children().eq(0).children().eq(1).html().trim().split(' ')[0],
                lang: $(this).find('span[itemprop="programmingLanguage"]').html(),
                descr: $(this).children().eq(2).contents().last()[0].data.trim(),
                stars: $(this).find('svg[aria-label="star"]').parent().contents()[2].data.trim().split(',').join('')
            })
        })

        repositories = repositories.map(repository => ({
            ...repository,
            link: `https://github.com/${repository.author}/${repository.title}`
        }))

        res.render('available', { isIndex: false, repositories })
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

router.post('/save', async (req, res) => {
    try {
        const { title, author, lang, descr, stars } = req.body

        await createRepository(title, author, lang, descr, stars)

        res.redirect('/')
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body
        await deleteRepository(id)
        res.redirect('/')
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

module.exports = router