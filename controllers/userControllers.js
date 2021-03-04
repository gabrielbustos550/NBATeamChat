const router = require('express').Router()
const db = require('../models')
const cryptojs = require('crypto-js')
const bcrypt = require('bcrypt')



router.get('/login', (req, res) => {
    try{
        res.render('user/login')
    } catch (err) {
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    try{
    const user = await db.user.findOne({
        where: { email: req.body.email }
    })
    if(user && bcrypt.compareSync(req.body.password, user.password)){
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET)
        const encryptedUserIdString = encryptedUserId.toString()

        res.cookie('userId', encryptedUserIdString)
        res.redirect('/user/profile')

    } else {
        res.render('user/login', { errors: "Invalid email/password"})
    }
        }catch (err) {
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
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)


    try{

        if(!req.body.email || !req.body.password) {
            res.render('user/signup', { errors: 'Invalid username/password'})
            return;
        }

        const newUser = await db.user.create({
            email: req.body.email,
            password: hashedPassword
        })
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.COOKIE_SECRET)
        const encryptedUserIdString = encryptedUserId.toString()



        res.cookie('userId', encryptedUserIdString)


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