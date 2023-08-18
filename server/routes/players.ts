const express = require('express');

const router = express.Router();

// GET all players
router.get('/', (req, res) => {
    res.json({ mssg: 'GET all players'})
} );

// GET a player
router.get('/:id', (req, res) => {
    res.json({ mssg: 'GET a player'})
} );

// POST a player
router.post('/', (req, res) => {
    res.json({ mssg: 'POST a player'})
} );

// UPDATE a player
router.patch('/:id', (req, res) => {
    res.json({ mssg: 'UPDATE a player'})
} );
module.exports = router;