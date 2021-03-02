const express = require('express')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
const ejsLayouts = require('express-ejs-layouts')


const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = process.env.PORT || 3000


app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))



/* Controller */
app.use('/user', require('./controllers/userControllers'))




app.get('/', async (req, res) => {
    res.render('index')
})


app.listen(PORT, () => {
    rowdyResults.print()
})