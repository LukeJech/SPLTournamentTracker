const express = require('express');
const {
    createPlayer,
    getAllPlayers,
    getPlayer,
    deletePlayer,
    updatePlayer
} = require('../controllers/playerController.js');


const router = express.Router();

// GET all players
router.get('/', getAllPlayers);

// GET a player
router.get('/:id', getPlayer);


// POST a player
router.post('/', createPlayer);

// Delete a player
router.delete('/:id', deletePlayer);

// UPDATE a player
router.patch('/:id', updatePlayer);
module.exports = router;