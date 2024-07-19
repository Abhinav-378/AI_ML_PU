const express = require('express')
const app = express()
const cors = require('cors')

const connectToDb = require('./config/db.js')
const port = 3000
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())
connectToDb()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const patientRoutes = require('./routes/patientRoutes.js')

app.use('/', patientRoutes)