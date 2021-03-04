const axios = require('axios')
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






module.exports = router