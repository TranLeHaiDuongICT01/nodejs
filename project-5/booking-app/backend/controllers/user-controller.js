const User = require('../models/User')
const customError = require('../errors/customError')

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password')
        res.status(200).json({ users })
    } catch (error) {
        return next(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId)
        if (!user || user.length === 0) {
            return next(new customError(`Not found user with id ${userId}`, 404))
        }
        const { password: pass, ...others } = user._doc
        res.status(200).json({ user: others })
    } catch (error) {
        return next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await User.findByIdAndUpdate(userId, { $set: req.body },
            { new: true, runValidators: true })
        if (!user || user.length === 0) {
            return next(new customError(`Not found user with id ${userId}`, 404))
        }
        const { password: pass, ...others } = user._doc
        res.status(200).json({ user: others })
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await User.findByIdAndDelete(userId)
        if (!user || user.length === 0) {
            return next(new customError(`Invalid user with id ${userId}`, 404))
        }
        res.status(200).json({ msg: "Delete successfully" })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}