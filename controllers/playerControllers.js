const axios = require('axios')
const db = require('../models')
const { route } = require('./userControllers')
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

router.post('/', async(req, res) => {
    try{
        const [newPlayer, created] = await db.player.findOrCreate({
            where: {
                name: req.body.name
            }
        })
        res.locals.user.addPlayer(newPlayer);
        res.redirect('user/profile')

    } catch (err) {
        console.log(err)
    }
})

module.exports = router