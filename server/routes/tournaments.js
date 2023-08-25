const express = require('express');
const {
getTournament,
getAllTournaments,
getAllTournamentEntries,
deleteTournament,
deleteAllTournaments,
} = require('../controllers/tournamentController.js');

const router = express.Router();

// GET all tournaments from our db
router.get('/all', getAllTournamentEntries);



// reset tournament data
router.delete('/all/delete', deleteAllTournaments);

// Get 1 tournament data
router.get('/:id', getTournament);

// GET all tournaments
router.get('/', getAllTournaments);

// Delete a tournament
router.delete('/:id', deleteTournament);



module.exports = router;