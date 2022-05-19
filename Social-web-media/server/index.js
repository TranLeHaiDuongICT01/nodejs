const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./connectDB')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const postsRoute = require('./routes/posts-routes')
const authRoute = require('./routes/auth-routes')
const cookieSession = require("cookie-session");


app.use(cors())
app.use(cookieParser())

app.set('trust proxy', 1)
app.use(
    cookieSession({
        name: "SID",
        keys: ["key1"],
        maxAge: 24 * 60 * 60 * 100,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        secureProxy: true
    })
);

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})

app.use('/posts', postsRoute)
app.use('/users', authRoute)

app.use('/', (req, res, next) => {
    res.send("App is running")
})


app.use((err, req, res, next) => {
    if (res.headerSent) {
        return next(err)
    }
    res.status(err.status || 500).json({ msg: err.message || 'Something went wrong, please try again' })
})

const PORT = process.env.PORT || 5000

connectDB(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    })
}).catch(err => console.log(err))

