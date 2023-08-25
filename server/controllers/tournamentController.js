const PlayerController = require('./playerController.js');
const Tournament = require('../models/Tournament.js');
const mongoose = require('mongoose');
const { calculate_points } = require('../calculations/score_calculations');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createTournamentEntry = async (name, start_date) => {
  try {
    const tournament = await Tournament.create({name, start_date});
    return tournament
  } catch (error) {
    throw new Error(error.message)
  }
}

// /tournaments/all
const getAllTournamentEntries = async (req, res) => {
  const tournaments = await Tournament.find({}).sort({start_date:-1});
  res.status(200).json(tournaments);
}


const getTournamentByStartDate = async (start_date) => {
  try {
    const tournament = await Tournament.findOne({ start_date })
    return tournament
  } catch{
    throw new Error(error.message)
  }
}


const getTournament = async (id) => {
  try {
    const response = await fetch(`https://api.splinterlands.com/tournaments/find?id=${id}`);

    if (!response.ok) {
      console.error('API network response was not ok:', response.status);
      return null; // or throw an error
    }

    

      const data = await response.json();

      for (const player of data.players) { 

        let playerName = player.player
        let points = calculate_points(player.finish)
        let player_points = {
          // check hich tournament type it is add points to the correct field
                noviceModern: data.data.rating_level === 0 && data.data.allowed_cards.epoch === 'modern' ? points: 0,
                bronzeModern: data.data.rating_level === 1 && data.data.allowed_cards.epoch === 'modern' ? points: 0, // 71
                bronzeWild: data.data.rating_level === 1 && data.data.allowed_cards.epoch === 'wild' ? points: 0,
                silverModern: data.data.rating_level === 2 && data.data.allowed_cards.epoch === 'modern' ? points: 0, // 46, 96, 16
                silverWild: data.data.rating_level === 2 && data.data.allowed_cards.epoch === 'wild' ? points: 0, // 30, 146, 128, 14, 43
                goldModern: data.data.rating_level === 3 && data.data.allowed_cards.epoch === 'modern' ? points: 0, // 78, 3, 10, 97, 7, 135, 6, 37, 7, 14
                goldWild: data.data.rating_level === 3 && data.data.allowed_cards.epoch === 'wild' ? points: 0, //140, 174, 109
                diamondModern: data.data.rating_level === 4 && data.data.allowed_cards.epoch === 'modern' ? points: 0, // 85, 62, 66, 22, 16, 62, 9, 128
                diamondWild: data.data.rating_level === 4 && data.data.allowed_cards.epoch === 'wild' ? points: 0,
        }
  
        const player_placement = {
          first: player.finish=== 1 ? 1 : 0,
          second: player.finish=== 2 ? 1 : 0,
          third: player.finish=== 3 ? 1 : 0,
          top10: player.finish>= 4 && player.finish<= 10 ? 1 : 0,
        }

        try {
          const playerDB = await PlayerController.getPlayerByName(playerName);
  
          if (playerDB) {
            try {
              const updatedPlayer = await PlayerController.updatePlayer(playerName, player_points, player_placement);
              console.log('Player updated:', updatedPlayer);
            } catch (error) {
              console.error('Error updating player:', error);
              return null;
            }
          } else {
  
            const createdPlayer = await PlayerController.createPlayer(playerName, player_points, player_placement);
  
          }

        } catch (error) {
          // Handle error
          console.error('Error creating/updating player:', error);
        }
      }

      return 'Tournament data processed!'

  } catch (error) {
    console.error('Error fetching tournament data:', error);
    return null;
  }
};

const getAllTournaments = async () => {
  try {
    const response = await fetch('https://api.splinterlands.com/tournaments/completed?username=luke-wtp');
    const data = await response.json();

    for (const element of data) {
      if (element.created_by === 'sps.tournaments') {
        const tournamentEntry = await getTournamentByStartDate(element.start_date);
        if (tournamentEntry) {
          console.log('Tournament already exists', element.name, element.start_date);
        } else {
          console.log('Creating tournament', element.name);
          await delay(10000); // Adjust the delay time as needed
          const tournament = await getTournament(element.id);
          createTournamentEntry(element.name, element.start_date);
        }
      }
    }

    return data;
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return null;
  }
};

const deleteTournament = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({err: 'Tournament not found'});
  }

  const tournament = await Tournament.findOneAndDelete({_id: id});

  if (!tournament) {
    return res.status(404).json({err: 'Tournament not found'});
  }

  res.status(200).json(tournament);
}

const deleteAllTournaments = async (req,res ) => {
  try {
    const result = await Tournament.deleteMany({});
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({err: error.message})
  }
}



module.exports = {
    getTournament,
    getAllTournaments,
    getAllTournamentEntries,
    deleteTournament,
    deleteAllTournaments
};
