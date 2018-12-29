const mongoose = require('mongoose');
const Scheama = mongoose.Schema;

const UserSchema = new Scheama({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },

    },
    {
        timestamp: true
    }
);


exports = mongoose.model('User', UserSchema);