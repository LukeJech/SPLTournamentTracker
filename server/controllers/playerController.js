const Player = require('../models/Player.ts');
const mongoose = require('mongoose');

// get all workous
const getAllPlayers = async (req, res) => {
        const players = await Player.find({}).sort({name:1});
        res.status(200).json(players);

}

// get a single workout
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

// create a new player
const createPlayer = async (name, points, placements) => {

    // add doc to db
    console.log(name, points, placements)
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

// update a player
const updatePlayer = async (req, res) => {
    const {id} = req.params;
    const {name, points} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'Player not found'});
    }

    const player = await Player.findOneAndUpdate({_id: id}, 
        {
            ...req.body,
        });

        if (!player) {
            return res.status(404).json({err: 'Player not found'});
        }
    
        res.status(200).json(player);
}

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayer,
    deletePlayer,
    updatePlayer
}