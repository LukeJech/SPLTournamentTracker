const express = require('express');
const {
getTournament,
} = require('../controllers/tournamentController.js');

const router = express.Router();

// Get 1 tournament data
router.get('/:id', getTournament);

module.exports = router;