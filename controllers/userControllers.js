const router = require('express').Router()
const db = require('../models')

router.get('/login', (req, res) => {
    try{
        res.render('user/login')
    } catch (err) {
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    const user = await db.user.findOne({
        where: { email: req.body.email }
    })
    if(user.password === req.body.password){
        res.cookie('userId', user.id)
        res.redirect('/user/profile')

    } else {
        res.render('user/login')
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
        res.cookie('userId', newUser.id)
        res.redirect('/user/profile')

    } catch (err) {
        console.log(err)
    }
})


router.get('/profile', (req, res) => {
    res.render('user/profile')
})

router.get('/logout', (req, res) => {
    try{
    res.clearCookie('userId')
    res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})



module.exports = router