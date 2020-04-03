const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'prakash shrestha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'prakash shrestha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is some helpful text',
        title: 'Help',
        name: 'Prakash Shrestha'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'provide an address in the browser'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return console.log(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        }) 
    })
    // res.send({
    //     forecast: 'will rain',
    //     location: 'boston',
    //     address: req.query.address,
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'help error',
        name: 'prakash shrestha',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'prakash shrestha',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running')
})
