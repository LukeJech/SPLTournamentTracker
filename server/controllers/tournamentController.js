const PlayerController = require('./playerController.js');

const getTournament = async () => {
  try {
    const response = await fetch('https://api.splinterlands.com/tournaments/find?id=ac856fadd2c3c1c1156be158c069b482a6a563f8');

    if (!response.ok) {
      console.error('API network response was not ok:', response.status);
      return null; // or throw an error
    }

    const data = await response.json();
    if (data.created_by == "sps.tournaments") {
        
        const playerName = data.players[0].player
        const points = data.players[0].finish 
        const createdPlayer = await PlayerController.createPlayer(playerName, {
                bronzeModern: 0,
                bronzeWild: 0, 
                silverModern: points,
                silverWild: 0,
                goldModern: 0,
                goldWild: 0,
                diamondModern: 0,
                diamondWild: 0,
        });
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
