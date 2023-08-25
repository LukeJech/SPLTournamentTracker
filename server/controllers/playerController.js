const Player = require('../models/Player.ts');
const mongoose = require('mongoose');

// get all player
const getAllPlayers = async (req, res) => {
        const players = await Player.find({}).sort({name:1});
        res.status(200).json(players);

}

// get a single player by id
const getPlayer = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'Player not found'});
    }

    const player = await Player.findById(id);

    if (!player) {
        return res.status(404).json({err: 'Player not found'});
    }

    res.status(200).json(player);
}

// get a single player by name
const getPlayerByName = async (name) => {
    try {
        const player = await Player.findOne({ name })
        return player
    } catch(error){
        throw new Error(error.message)
    }
}

// create a new player
const createPlayer = async (name, points, placements) => {

    // add doc to db
    try{
        const player = await Player.create({name, points, placements});
        return player;
    } catch(err) {
        throw new Error(err.message)
    }
}

// delete a player
const deletePlayer = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'Player not found'});
    }

    const player = await Player.findOneAndDelete({_id: id});

    
    if (!player) {
        return res.status(404).json({err: 'Player not found'});
    }

    res.status(200).json(player);
}

// delete all players
const deleteAllPlayers = async (req, res) => {
    try {
        const players = await Player.deleteMany({});
        res.status(200).json(players);
    } catch {
        throw new Error(err.message)
    }
}

// update a player
const updatePlayer = async (name, points, placements) => {
    try{

        const updatedPlayer = await Player.findOneAndUpdate(
            { name },
            {
                $inc: {
                    'points.noviceModern': points.noviceModern,
                    'points.bronzeModern': points.bronzeModern,
                    'points.bronzeWild': points.bronzeWild,
                    'points.silverModern': points.silverModern,
                    'points.silverWild': points.silverWild,
                    'points.goldModern': points.goldModern,
                    'points.goldWild': points.goldWild,
                    'points.diamondModern': points.diamondModern,
                    'points.diamondWild': points.diamondWild,
                    'placements.first': placements.first,
                    'placements.second': placements.second,
                    'placements.third': placements.third,
                    'placements.top10': placements.top10,
                }
            },
            {new: true}
            );
            return updatedPlayer
    } catch(err) {
        throw new Error(err.message)
    }

}

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerByName,
    getPlayer,
    deletePlayer,
    updatePlayer,
    deleteAllPlayers
}