const express = require('express')
const router = express.Router()
const { getAllUsers, updateUser,
    getUserById, deleteUser } = require('../controllers/user-controller')

const { checkUser, checkAuth, checkAdmin } = require('../utils/check-auth')

router.get('/', getAllUsers)
router.route('/:userId').get(getUserById).patch(checkAuth, checkUser, updateUser).delete(checkAuth, checkUser, checkAdmin, deleteUser)


module.exports = router