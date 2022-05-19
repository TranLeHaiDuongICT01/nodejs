const express = require('express')
const router = express.Router()
const {
    getAllHotels,
    createHotel,
    updateHotel,
    deleteHotel,
    getHotelById,
    getHotelByCity,
    countByType,
    getHotelRooms
} = require('../controllers/hotel-controller')

router.route('/').get(getAllHotels).post(createHotel)
router.get('/countByCity', getHotelByCity)
router.get('/countByType', countByType)
router.get('/room/:hotelId', getHotelRooms)
router.route('/:hotelId').patch(updateHotel).delete(deleteHotel).get(getHotelById)


module.exports = router