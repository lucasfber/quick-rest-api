const express = require('express')
const bodyParser = require('body-parser')
const restful = require('node-restful')
const mongoose = restful.mongoose

const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/filmes')

let movieSchema = new mongoose.Schema({
    title : String,
    year : Number,
    gender : String
})

let movieModel = restful.model('movie', movieSchema)

movieModel.methods(['get', 'post', 'put', 'delete'])
movieModel.register(app, '/api/movies')


app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000')
})