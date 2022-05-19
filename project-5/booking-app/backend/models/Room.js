const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: {
        type: [{
            number: Number,
            unavailableDates: { type: [Date] }
        }],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Room', roomSchema)