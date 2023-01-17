const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

// Connecting with mongo db
mongoose
  .connect('mongodb://127.0.0.1:27017/mydatabase')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })


// Setting up port with express js
const employeeRoute = require('../server/modal/post.route');
const UserRoute = require('../server/modal/Routing/user')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api', employeeRoute);


// app.use('/api', UserRoute)

// app.use(express.static('/public'))
// app('/', (res, req) => {
//   app.sendFile(path())
// })


// Create port
const port = 4000
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

