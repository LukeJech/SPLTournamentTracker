const getTournament = async () => {
  try {
    const response = await fetch('https://api.splinterlands.com/tournaments/find?id=ac856fadd2c3c1c1156be158c069b482a6a563f8');
    if (!response.ok) {
      console.error('API network response was not ok:', response.status);
      return null; // or throw an error
    }
    const data = await response.json();
    console.log('Data:', data.players[0]);
    return data;
  } catch (error) {
    console.error('Error fetching tournament data:', error);
    return null;
  }
};

module.exports = {
    getTournament,
};
