const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    description: {
        type: String
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

module.exports = mongoose.model('categories', CategorySchema);