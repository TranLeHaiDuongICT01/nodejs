const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../models/user-model')
const customError = require('../errors/errors')
const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await Users.findOne({ email: email })
        if (!user || user.length === 0) {
            return next(new customError('Email is not signed up!', 404))
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return next(new customError('Wrong password', 400))
        }
        const token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: '1h' })
        return res.status(200).json({ result: user, token })
    } catch (error) {
        return next(error)
    }
}

const signup = async (req, res, next) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    try {
        console.log("Sign up");
        const existingUser = await Users.findOne({ email: email })

        if (existingUser && existingUser.length > 0) {
            return next(new customError('User already exists', 400))
        }
        if (password !== confirmPassword) {
            return next(new customError("Passwords don't match", 400))
        }
        const hashed = await bcrypt.hash(password, 12)
        const user = await Users.create({ name: `${firstName} ${lastName}`, email, password: hashed })
        const token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: '1h' })

        return res.status(200).json({ result: user, token })

    } catch (error) {
        return next(error)
    }
}

module.exports = {
    signin,
    signup
}