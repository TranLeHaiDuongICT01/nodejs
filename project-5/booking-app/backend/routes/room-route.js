const express = require('express')
const router = express.Router()
const {
    createRoom,
    updateRoom,
    getAllRooms,
    getRoomById,
    deleteRoom
} = require('../controllers/room-controller')

router.route('/').get(getAllRooms)
router.post('/:hotelId', createRoom)
router.route('/:roomId').patch(updateRoom).get(getRoomById)
router.delete('/:roomId/:hotelId', deleteRoom)

module.exports = router