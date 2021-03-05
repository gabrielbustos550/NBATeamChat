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


router.get('/:id', async (req, res) => {
    try{ 
        const gamesUrl =`https://balldontlie.io/api/v1/games?seasons[]=2020&seasons[]=2021&team_ids[]=${req.params.id}`
        const response = await axios.get(gamesUrl)
        const games = response.data.data
        console.log(games)

        res.render('teams/homepage', {games: games})

    } catch(err) {
        console.log(err)
    
    }



})




module.exports = router