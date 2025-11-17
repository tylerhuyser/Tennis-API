const fetchPage = require('../utils/fetchPage');
const buildEntry = require('./buildDoublesTeamEntry');

async function scrapeWTADoublesRace(url) {
  const response = await fetchPage(url);

  return response.data.map((team, i) =>
    buildEntry({
      ranking: team.ranking,
      player1: {
        name: team.player1.fullName,
        country: team.player1.countryCode,
      },
      player2: {
        name: team.player2.fullName,
        country: team.player2.countryCode,
      },
      points: team.points,
      tournamentsPlayed: team.tournamentsPlayed
    })
  );
}
  
  module.exports = {
    scrapeWTADoublesRace
  };