const Room = require('../models/Room')
const Hotel = require('../models/Hotel')
const customError = require('../errors/customError')

const createRoom = async (req, res, next) => {
    const { hotelId } = req.params
    const room = new Room(req.body)
    try {
        const saveRoom = await room.save()

        await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: saveRoom._id } })

        res.status(201).json({ room: saveRoom })
    } catch (error) {
        return next(error)
    }
}

const updateRoom = async (req, res, next) => {
    const { roomId } = req.params
    try {
        const room = await Room.findByIdAndUpdate(roomId,
            { $set: req.body }, { new: true, runValidators: true })

        res.status(200).json({ room })
    } catch (error) {
        return next(error)
    }
}


const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find({})
        res.status(200).json({ rooms })
    } catch (error) {
        next(error)
    }
}

const getRoomById = async (req, res, next) => {
    try {
        const { roomId } = req.params
        const room = await Room.findById(roomId)
        if (!room || room.length === 0) {
            return next(new customError(`Not found room with id ${roomId}`, 404))
        }
        res.status(200).json({ room })
    } catch (error) {
        return next(error)
    }
}

const deleteRoom = async (req, res, next) => {
    try {
        const { roomId, hotelId } = req.params
        const room = await Room.findByIdAndDelete(roomId)
        if (!room || room.length === 0) {
            return next(new customError(`Not found room with id ${roomId}`, 404))
        }
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: room._id } })
        res.status(200).json({ msg: "Delete successfully" })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createRoom,
    updateRoom,
    getAllRooms,
    getRoomById,
    deleteRoom
}