const mongoose = require('mongoose');

const CoruselSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    periority: {
        type: Number,
        default: 0 // 0 => low, 1 => medium, 2 => high
    },
    status:{
        type: Number,
        default: 0 // 0 => draft, 1 => publish (active), 2 => deactivated, 3 => deleted
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date
    }
});

module.exports = mongoose.model('corusels', CoruselSchema);