const axios = require('axios')
const db = require('../models')
const router = require('express').Router()





router.get('/', async (req, res) => {
    try{
        const teamsUrl = 'https://balldontlie.io/api/v1/teams'
        const result = await axios.get(teamsUrl)
        const teams = result.data.data
    

        res.render('teams/index', { teams: teams } )
    } catch (err) {
        console.log(err)
    }

})
router.post('/', async (req, res) => {
    try{
        const [newTeam, created] = await db.team.findOrCreate({ 
            where: {
                name: req.body.name
            }
        })
        res.locals.user.addTeam(newTeam);
        res.redirect('user/profile')

    } catch (err) {
        console.log(err)
    }
})


router.get('/:id/games', async (req, res) => {
    try{ 
        const gamesUrl =`https://balldontlie.io/api/v1/games?seasons[]=2020&seasons[]=2021&team_ids[]=${req.params.id}`
        const response = await axios.get(gamesUrl)
        const games = response.data.data
        

        res.render('teams/homepage', {games: games, teamId: req.params.id})

    } catch(err) {
        console.log(err)
    
    }

})
router.get('/:teamId/games/:gameId', async (req, res) => {
    try{
        const gameUrl = `https://balldontlie.io/api/v1/games/${req.params.gameId}`
        const response = await axios.get(gameUrl)
        const game = response.data
        console.log(game)
        

        res.render('teams/game')
    }catch (err) {
        console.log(err)
    }
})




module.exports = router