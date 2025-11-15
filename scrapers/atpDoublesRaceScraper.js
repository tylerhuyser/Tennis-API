const axios = require('axios');
const cheerio = require('cheerio');
const buildEntry = require('./buildDoublesTeamEntry');

async function scrapeATPDoubles(url) {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const $ = cheerio.load(response.data);

  let rankings = [];
  let playerOneName = []
  let playerOneCountry = []
  let playerOneAge = []
  let playerTwoName = []
  let playerTwoCountry = []
  let playerTwoAge = []
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

        // Scraping rankings
        $('.desktop-table tbody tr .rank.bold.heavy').each((i, td) => {
          rankings.push($(td).text().trim());
        });
      
          // Scraping countries (Player 1)
        $('.desktop-table tbody tr .player .player-stats .name .player1 .atp-flag use').each((i, use) => {
          playerOneCountry.push($(use).attr('href').split('/assets/atptour/assets/flags.svg#flag-')[1].toUpperCase())
        });
    
             // Scraping countries (Player 2)
        $('.desktop-table tbody tr .player .player-stats .name .player2 .atp-flag use').each((i, use) => {
          playerTwoCountry.push($(use).attr('href').split('/assets/atptour/assets/flags.svg#flag-')[1].toUpperCase())
        });
      
          // Scraping Names (Player 1)
        $('.desktop-table tbody tr .player .player-stats .name .player1 a').each((i, span) => {
           playerOneName.push($(span).attr('href').split("/")[3].split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ").trim())
        });
    
        // Scraping Names (Player 2)
        $('.desktop-table tbody tr .player .player-stats .name .player2 a').each((i, span) => {
          playerTwoName.push($(span).attr('href').split("/")[3].split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ").trim())
        });
    
        // Scraping Ages
        $('.desktop-table tbody tr .age.tiny-cell').each((i, td) => {
          playerOneAge.push($(td).text().split("/")[0].trim())
          playerTwoAge.push($(td).text().split("/")[1].trim())
        });
      
          // Scraping points
        $('.desktop-table tbody tr .points').each((i, td) => {
          points.push($(td).text().trim());
        });


  return rankings.map((_, i) =>
    buildEntry(rankings[i], countries[i], names[i], ages[i], points[i], tournaments[i])
  );
  
  }
  
  module.exports = {
    scrapeATPDoubles
  };