const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model('Tournament', TournamentSchema);