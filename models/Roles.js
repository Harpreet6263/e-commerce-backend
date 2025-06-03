const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },

    hierarchy_position: {
        type: String // s=> seller , u=>user
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

module.exports = mongoose.model('roles', RolesSchema);