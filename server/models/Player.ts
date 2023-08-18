const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    points: {
        bronzeModern: {
            type: Number,
            default:0,
        },
        bronzeWild: {  
            type: Number,
            default:0,
        },
        silverModern: {
            type: Number,
            default:0,
        },
        silverWild: {  
            type: Number,
            default:0,
        },
        goldModern: {
            type: Number,
            default:0,
        },
        goldWild: {  
            type: Number,
            default:0,
        },
        diamondModern: {
            type: Number,
            default:0,
        },
        diamondWild: {  
            type: Number,
            default:0,
        },

    }
})

module.exports = mongoose.model('Player', PlayerSchema);