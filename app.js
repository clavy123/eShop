const express = require('express')
const app = express()
require('dotenv').config()

//to read json data
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//api routes
const apiRoutes = require('./routes/apiroutes')
app.use('/api/v1',apiRoutes);
module.exports = app