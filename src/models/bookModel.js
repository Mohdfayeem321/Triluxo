const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    category: {
        type: String,
        required: true,
        trim:true
    },

    deletedAt:Date,

    isDeleted: {
        type: Boolean,
        default: false

    },
},

    { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema)


