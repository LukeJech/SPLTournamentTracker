const PlayerController = require('./playerController.js');
const { calculate_points } = require('../calculations/score_calculations');


const getTournament = async () => {
  try {
    const response = await fetch('https://api.splinterlands.com/tournaments/find?id=c23d4d319977cfe04dce448fba6bf372c3072a4e');

    if (!response.ok) {
      console.error('API network response was not ok:', response.status);
      return null; // or throw an error
    }

    const data = await response.json();
    if (data.created_by == "sps.tournaments") {
        
        const playerName = data.players[0].player
        const points = calculate_points(data.players[0].finish)
        const player_points = {
                bronzeModern: data.data.rating_level === 1 && data.data.allowed_cards.epoch === 'modern' ? points: 0,
                bronzeWild: data.data.rating_level === 1 && data.data.allowed_cards.epoch === 'wild' ? points: 0,
                silverModern: data.data.rating_level === 2 && data.data.allowed_cards.epoch === 'modern' ? points: 0,
                silverWild: data.data.rating_level === 2 && data.data.allowed_cards.epoch === 'wild' ? points: 0,
                goldModern: data.data.rating_level === 3 && data.data.allowed_cards.epoch === 'modern' ? points: 0,
                goldWild: data.data.rating_level === 3 && data.data.allowed_cards.epoch === 'wild' ? points: 0,
                diamondModern: data.data.rating_level === 4 && data.data.allowed_cards.epoch === 'modern' ? points: 0,
                diamondWild: data.data.rating_level === 4 && data.data.allowed_cards.epoch === 'wild' ? points: 0,
        }
        console.log(points, player_points, 'ratinglevel', data.data.rating_level)
        player_placement = {
          first: data.players[0].finish === 1 ? 1 : 0,
          second: data.players[0].finish === 2 ? 1 : 0,
          third: data.players[0].finish === 3 ? 1 : 0,
          top10: data.players[0].finish >= 4 && data.players[0].finish <= 10 ? 1 : 0,
        }

        const createdPlayer = await PlayerController.createPlayer(playerName, player_points, player_placement);
    }
    return data;

  } catch (error) {
    console.error('Error fetching tournament data:', error);
    return null;
  }
};



module.exports = {
    getTournament,
};
