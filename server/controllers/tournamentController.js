const PlayerController = require('./playerController.js');
const Tournament = require('../models/Tournament.js');
const mongoose = require('mongoose');
const { calculate_points } = require('../calculations/score_calculations');

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


const getTournament = async () => {
  try {
    const response = await fetch('https://api.splinterlands.com/tournaments/find?id=ac856fadd2c3c1c1156be158c069b482a6a563f8');

    if (!response.ok) {
      console.error('API network response was not ok:', response.status);
      return null; // or throw an error
    }

    

    const data = await response.json();

      const playerName = data.players[0].player
          const points = calculate_points(data.players[0].finish)
          const player_points = {
            // check hich tournament type it is add points to the correct field
                  bronzeModern: data.data.rating_level === 1 && data.data.allowed_cards.epoch === 'modern' ? points: 0,
                  bronzeWild: data.data.rating_level === 1 && data.data.allowed_cards.epoch === 'wild' ? points: 0,
                  silverModern: data.data.rating_level === 2 && data.data.allowed_cards.epoch === 'modern' ? points: 0,
                  silverWild: data.data.rating_level === 2 && data.data.allowed_cards.epoch === 'wild' ? points: 0,
                  goldModern: data.data.rating_level === 3 && data.data.allowed_cards.epoch === 'modern' ? points: 0,
                  goldWild: data.data.rating_level === 3 && data.data.allowed_cards.epoch === 'wild' ? points: 0,
                  diamondModern: data.data.rating_level === 4 && data.data.allowed_cards.epoch === 'modern' ? points: 0,
                  diamondWild: data.data.rating_level === 4 && data.data.allowed_cards.epoch === 'wild' ? points: 0,
          }
  
          const player_placement = {
            first: data.players[0].finish === 1 ? 1 : 0,
            second: data.players[0].finish === 2 ? 1 : 0,
            third: data.players[0].finish === 3 ? 1 : 0,
            top10: data.players[0].finish >= 4 && data.players[0].finish <= 10 ? 1 : 0,
          }

      try {
        const player = await PlayerController.getPlayerByName(playerName);

        if (player) {
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
        return player;
      } catch (error) {
        // Handle error
        console.error('Error creating/updating player:', error);
        return null;}


    return data;

  } catch (error) {
    console.error('Error fetching tournament data:', error);
    return null;
  }
};

const getAllTournaments = async () => {
  const response = await fetch ('https://api.splinterlands.com/tournaments/completed?username=luke-wtp')
  const data = await response.json();
  data.forEach(async (element) => {
    

    if(element.created_by == 'sps.tournaments') {
      const tournamentEntry = await getTournamentByStartDate(element.start_date) 
      if(tournamentEntry) {
        console.log('tournament already exists', element.name, element.start_date)
      } else{
      createTournamentEntry(element.name, element.start_date)
        
      }
    }
 
  });
  return data

}

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
