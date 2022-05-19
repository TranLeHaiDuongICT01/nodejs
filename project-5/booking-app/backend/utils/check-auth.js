const jwt = require('jsonwebtoken')
const customError = require('../errors/customError')

const checkAuth = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(new customError("You are not authenticated", 401))
    }
    try {
        const payload = jwt.verify(token, process.env.JWT)
        req.user = payload
        next()
    } catch (error) {
        return next(new customError("Token is not valid", 403))
    }
}

const checkUser = (req, res, next) => {
    if (req.user.userId === req.params.userId) next()
    else {
        return next(new customError("You are not authorized", 403))
    }
}

const checkAdmin = (req, res, next) => {
    if (req.user.isAdmin) next
    else {
        return next(new customError("You are not authorized", 403))
    }
}

module.exports = { checkAuth, checkUser, checkAdmin }