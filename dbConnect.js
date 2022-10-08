const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb+srv://jstar5197:DSKuMOAESXWsonvX@cluster0.9nqnodq.mongodb.net/cash-watch', {useNewUrlParser : true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))
connection.on('connected', () => console.log('MongoDB connection successful'))