const express = require('express')
const dbConnect = require('./dbConnect')
//I need cors always with MongoDB and React
var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const path = require('path')
const userRoute = require('./routes/usersRoute')
const transactionsRoute = require('./routes/transactionsRoute')
app.use('/api/users', userRoute)
app.use('/api/transactions', transactionsRoute)


const port = process.env.POT || 5000

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))
    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
    })
}

app.listen(port, () => console.log(`Node JS server started at ${port}!`))