const path = require('path')
const hbs = require ('hbs')
const express = require ('express')
const getapidata = require('./utils/getapidata')
const { response } = require('express')

const app = express()

const publicDirectory = path.join(__dirname, '../public')
const partialsDirectory = path.join(__dirname,'../template/partials')
const viewsDirectory = path.join(__dirname,'../template/views')

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

app.use(express.static(publicDirectory))

app.get('', (req, res)=>{
   getapidata( ( error , data)=>{
     if(error) pageData = error
     else pageData = data.articles
   })
   res.render('index', {pageData: pageData})
    
   // res.render('index')
})

app.listen(3000)