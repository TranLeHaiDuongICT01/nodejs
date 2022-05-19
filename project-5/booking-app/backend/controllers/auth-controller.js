const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const customError = require('../errors/customError')
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user || user.length === 0) {
            return next(new customError('Email invalid', 404))
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return next(new customError('Wrong password', 404))
        }
        const { password: pass, ...others } = user._doc
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin },
             process.env.JWT, {expiresIn: '1h'})
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ user: others })
    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const findUser = await User.find({ email: email })
        if (findUser && findUser.length > 0) {
            return next(new customError('Email already exists', 400))
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const user = await User.create({ name, email, password: hashed })

        const { password: pass, ...others } = user._doc
        res.status(201).json({ user: others })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    login,
    register
}