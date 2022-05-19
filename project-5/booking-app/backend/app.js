const express = require('express')
const app = express()
const connectDB = require('./db/connectDB')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth-route')
const userRoute = require('./routes/user-route')
const hotelRoute = require('./routes/hotel-route')
const roomRoute = require('./routes/room-route')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/hotel', hotelRoute)
app.use('/api/room', roomRoute)

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({ err: err.message || 'Something went wrong' })
})

const PORT = process.env.PORT || 5000

connectDB(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})