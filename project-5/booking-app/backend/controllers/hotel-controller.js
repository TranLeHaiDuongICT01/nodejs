const Hotel = require('../models/Hotel')
const customError = require('../errors/customError')
// const { Promise } = require('mongoose')
const Room = require('../models/Room')

const getAllHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query
    try {
        const hotel = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 999999999 }
        }).limit(req.query.limit)
        res.status(200).json({ hotel, count: hotel.length })
    } catch (error) {
        next(error)
    }
}

const getHotelById = async (req, res, next) => {
    try {
        const { hotelId } = req.params
        const hotel = await Hotel.findById(hotelId)
        if (!hotel || hotel.length === 0) {
            return next(new customError(`Not found hotel with id ${hotelId}`, 404))
        }
        res.status(200).json({ hotel })
    } catch (error) {
        return next(error)
    }
}

const createHotel = async (req, res, next) => {
    try {
        const { name, type, city, address,
            distance, title, desc, cheapestPrice } = req.body
        const hotel = await Hotel.create({
            name, type, city, address,
            distance, title, desc, cheapestPrice
        })
        res.status(201).json({ hotel })
    } catch (error) {
        next(error)
    }
}

const updateHotel = async (req, res, next) => {
    try {
        const { hotelId } = req.params
        const hotel = await Hotel.findByIdAndUpdate(hotelId, { $set: req.body },
            { new: true, runValidators: true })
        if (!hotel || hotel.length === 0) {
            return next(new customError(`Not found hotel with id ${hotelId}`, 404))
        }
        res.status(200).json({ hotel })
    } catch (error) {
        next(error)
    }
}

const deleteHotel = async (req, res, next) => {
    try {
        const { hotelId } = req.params
        const hotel = await Hotel.findByIdAndDelete(hotelId)
        if (!hotel || hotel.length === 0) {
            return next(new customError(`Not found hotel with id ${hotelId}`, 404))
        }
        res.status(200).json({ msg: "Delete successfully" })
    } catch (error) {
        next(error)
    }
}

const getHotelByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json({ list })
    } catch (error) {
        next(error)
    }
}

const countByType = async (req, res, next) => {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" })
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
    const resortCount = await Hotel.countDocuments({ type: "resort" })
    const villaCount = await Hotel.countDocuments({ type: "villa" })
    const cabinCount = await Hotel.countDocuments({ type: "cabin" })

    res.status(200).json([
        {
            type: "hotel",
            count: hotelCount
        },
        {
            type: 'apartment',
            count: apartmentCount
        },
        {
            type: 'resort',
            count: resortCount
        },
        {
            type: 'villa',
            count: villaCount
        },
        {
            type: 'cabin',
            count: cabinCount
        },
    ])
}

const getHotelRooms = async (req, res, next) => {
    try {
        const { hotelId } = req.params
        const hotel = await Hotel.findById(hotelId)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        }))
    } catch (error) {

    }
}

module.exports = {
    getAllHotels,
    createHotel,
    updateHotel,
    deleteHotel,
    getHotelById,
    getHotelByCity,
    countByType,
    getHotelRooms
}
