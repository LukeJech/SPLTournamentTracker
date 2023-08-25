const express = require('express');
const {
    createPlayer,
    getAllPlayers,
    getPlayer,
    deletePlayer,
    updatePlayer,
    deleteAllPlayers,
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

// Delete all players
router.delete('/all/delete', deleteAllPlayers)

// UPDATE a player
router.patch('/:id', updatePlayer);
module.exports = router;