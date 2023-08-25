const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    points: {
        noviceModern: {
            type: Number,
            default:0,
        },
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
    },
    placements: {
        first: {
            type: Number,
            default:0,
        },
        second: {
            type: Number,
            default: 0
        },
        third: {
            type: Number,
            default: 0
        },
        top10: {
            type:Number,
            default: 0
        }
    }
})

module.exports = mongoose.model('Player', PlayerSchema);