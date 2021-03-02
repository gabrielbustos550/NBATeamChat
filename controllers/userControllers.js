const router = require('express').Router()
const db = require('../models')

router.get('/login', (req, res) => {
    try{
        res.render('user/login')
    } catch (err) {
        console.log(err)
    }
})

router.get('/signup', (req, res) => {
    try{
        res.render('user/signup')
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/signup', async (req, res) => {
    try{
        const newUser = await db.user.create({
            email: req.body.email,
            password: req.body.password
        })
        res.redirect('/user/profile')

    } catch (err) {
        console.log(err)
    }
})


router.get('/profile', (req, res) => {
    res.render('user/profile')
})





module.exports = router