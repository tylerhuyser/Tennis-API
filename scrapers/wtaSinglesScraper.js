const fetchPage = require('../utils/fetchPage');
const buildEntry = require('./buildEntry');

async function scrapeWTASingles(url) {

  const response = await fetchPage(url);

  return response.data.map((player, i) =>
    buildEntry({
      ranking: player.ranking,
      country: player.player.countryCode,
      name: player.player.fullName,
      points: player.points,
      tournamentsPlayed: player.tournamentsPlayed
    })
  );
  
}

module.exports = {
  scrapeWTASingles
};