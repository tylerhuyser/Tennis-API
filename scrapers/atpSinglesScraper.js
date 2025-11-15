const axios = require('axios');
const cheerio = require('cheerio');
const buildEntry = require('./buildEntry');

async function scrapeATPSingles(url) {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const $ = cheerio.load(response.data);

  let rankings = [];
  let countries = [];
  let names = [];
  let ages = [];
  let points = [];
  let tournaments = [];

  
      // Scraping rankings
    $('.desktop-table tbody tr .rank.bold.heavy').each((i, td) => {
      rankings.push($(td).text().trim());
    });
  
      // Scraping countries
    $('.desktop-table tbody tr .player .player-stats .avatar .atp-flag use').each((i, use) => {
      countries.push($(use).attr('href').split('/assets/atptour/assets/flags.svg#flag-')[1].toUpperCase());
    });
  
      // Scraping names
    $('.desktop-table tbody tr .player .player-stats .name a span').each((i, span) => {
      names.push($(span).text().trim());
    });
  
      // Scraping ages
    $('.desktop-table tbody tr .age').each((i, td) => {
      ages.push($(td).text().trim());
    });
  
      // Scraping points
    $('.desktop-table tbody tr .points a').each((i, a) => {
      points.push($(a).text().trim());
    });
  
      // Scraping tournaments played
    $('.desktop-table tbody tr .tourns').each((i, td) => {
      tournaments.push($(td).text().trim());
    });
  
    return rankings.map((_, i) =>
      buildEntry(rankings[i], countries[i], names[i], ages[i], points[i], tournaments[i])
    );
  
}

module.exports = {
  scrapeATPSingles
};