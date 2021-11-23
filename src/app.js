const path = require('path')
const cors = require('cors')
const express = require('express')
require('./db/mongoose')
const taskRouter = require('./routers/Task')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(taskRouter)


module.exports = app
