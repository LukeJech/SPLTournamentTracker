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
        const points = calculate_points(data.players[0].finish)
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

const calculate_points = finish => {
  const ranges = [
    {range: [1], points: 15},
    { range: [2, 3], points: 12 },
    { range: [4, 8], points: 8 },
    { range: [9, 16], points: 5 },
    { range: [17, 32], points: 3 },
    { range: [33, 64], points: 2 },
    { range: [65, 128], points: 1 }
  ]

  const match = ranges.find(({ range }) => range.includes(finish));
  return match ? match.points : 0;
}

module.exports = {
    getTournament,
};
