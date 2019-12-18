const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherRequest = require('./utils/weatherRequest')
const app = express()

//setting directories
const publicDir = path.join(__dirname , '../public')
const viewsDir = path.join(__dirname , '../templates/views')
const hbsDir = path.join(__dirname , '../templates/partials')

//serving dynamic pages and handelbars
app.set('view engine' , 'hbs')
app.set('views' , viewsDir)
hbs.registerPartials(hbsDir)

//serving statice pages
app.use(express.static(publicDir))

app.get('' , (req , res) => {
    res.render('index' ,{
        title: 'Weather',
        name: 'Ahmed'
    })
})

app.get('/about' , (req , res) => {
    res.render('about' ,{
        title: 'About',
        name: 'Ahmed'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' ,{
        title: 'help',
        name: 'Ahmed'
    })
})

app.get('/weather' , (req , res) => {
    var address = req.query.address
    if(!address){
        return res.send({
            error : 'You must provide an address!'
        })
    }
    geocode(address , (err , {lat , long , location} = {}) =>{
        if(err){
            return res.send({
                error : err
            })
        }

        weatherRequest(lat , long , (err , weatherData)=>{
            if(err){
                return res.send({
                    error : err
                })
            }        
            res.send({
                forcast : weatherData,
                location ,
            })
        })
    })
   
})



app.get('/product' , (req , res) => {
   
    if(!req.query.search){
        return res.send({
            error : 'You must provide search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*' , (req , res) => {
    res.render('404' ,{
        errorMessage: 'Help artical not found!',
        title: '404 Error',
        name:'Ahmed'
    })
})

app.get('*' , (req , res) => {
    res.render('404' ,{
        errorMessage: 'Page Not Found!',
        title: '404 Error',
        name:'Ahmed'
    })
})

app.listen(3000,() => {
    console.log('Server is running...')
})