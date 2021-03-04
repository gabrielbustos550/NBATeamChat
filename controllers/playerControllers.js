const axios = require('axios')
const router = require('express').Router()



router.get('/', async(req, res) => {
    try {
        const playersUrl = 'https://balldontlie.io/api/v1/players'
        const result = await axios.get(playersUrl)
        const players = result.data.data

        res.render('players/index', {players: players})


    } catch (err) {
        console.log(err)
    }
})

module.exports = router