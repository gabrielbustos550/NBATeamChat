require('dotenv').config()
const express = require('express')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const models = require('./models')
const cryptojs = require('crypto-js')



const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = process.env.PORT || 3000


app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))
app.use(cookieParser())



app.use(async (req, res, next) => {
    if (req.cookies.userId) {
        const decryptedUserId = cryptojs.AES.decrypt(req.cookies.userId, process.env.COOKIE_SECRET)
        const decryptedUserIdString = decryptedUserId.toString(cryptojs.enc.Utf8)


        const user = await models.user.findByPk(decryptedUserIdString) 
        res.locals.user = user
    } else {
        res.locals.user = null
    }

    next()
})

app.get('/', async (req, res) => {
    res.render('index')
})

/* Controllers */
app.use('/user', require('./controllers/userControllers'))
app.use('/teams', require('./controllers/teamControllers'))




app.listen(PORT, () => {
    rowdyResults.print()
})