const router = require('express').Router();
const axios  = require('axios');
const cheerio = require('cheerio');

// ATP URLS
const ATP_SINGLES_URL = 'https://www.atptour.com/en/rankings/singles';
const ATP_SINGLES_RACE = 'https://www.atptour.com/en/rankings/singles-race-to-london';
const ATP_DOUBLES_URL = 'https://www.atptour.com/en/rankings/doubles';
const ATP_DOUBLES_RACE = 'https://www.atptour.com/en/rankings/doubles-team-rankings'

/* ATP RANKINGS */

// ATP singles rankings API response
router.get('/rankings/singles', (req, res) => {

  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

  axios.get(ATP_SINGLES_URL).then((response) => {
    const $ = cheerio.load(response.data);

    // Scraping rankings
    $('.mega-table tbody tr .rank-cell').each((i, td) => {
      rankings.push($(td).text().trim());
    });

    // Scraping countries
    $('.mega-table tbody tr .country-cell .country-inner .country-item img').each((i, img) => {
      countries.push($(img).attr('alt'));
    });

    // Scraping names
    $('.mega-table tbody tr .player-cell').each((i, td) => {
      players.push($(td).text().trim());
    });

    // Scraping ages
    $('.mega-table tbody tr .age-cell').each((i, td) => {
      ages.push($(td).text().trim());
    });

    // Scraping points
    $('.mega-table tbody tr .points-cell').each((i, td) => {
      points.push($(td).text().trim());
    });

    // Scraping tournaments played
    $('.mega-table tbody tr .tourn-cell').each((i, td) => {
      tournaments.push($(td).text().trim());
    });

    for (let i = 0; i < rankings.length; i++){
      JSONResponse.push({
        "ranking": rankings[i],
        "country": countries[i],
        "player": players[i],
        "age": ages[i],
        "points": points[i],
        "tournaments_played": tournaments[i]
      })
    }

    res.json(JSONResponse);
  });
});

// ATP Race to London API response
router.get('/rankings/singles-race', (req, res) => {

  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

  axios.get(ATP_SINGLES_RACE).then((response) => {
    const $ = cheerio.load(response.data);

    // Scraping rankings
    $('.mega-table tbody tr .rank-cell').each((i, td) => {
      rankings.push($(td).text().trim());
    });

    // Scraping countries
    $('.mega-table tbody tr .country-cell .country-inner .country-item img').each((i, img) => {
      countries.push($(img).attr('alt'));
    });

    // Scraping names
    $('.mega-table tbody tr .player-cell').each((i, td) => {
      players.push($(td).text().trim());
    });

    // Scraping ages
    $('.mega-table tbody tr .age-cell').each((i, td) => {
      ages.push($(td).text().trim());
    });

    // Scraping points
    $('.mega-table tbody tr .points-cell').each((i, td) => {
      points.push($(td).text().trim());
    });

    // Scraping tournaments played
    $('.mega-table tbody tr .tourn-cell').each((i, td) => {
      tournaments.push($(td).text().trim());
    });

    for (let i = 0; i < rankings.length; i++){
      JSONResponse.push({
        "ranking": rankings[i],
        "country": countries[i],
        "player": players[i],
        "age": ages[i],
        "points": points[i],
        "tournaments_played": tournaments[i]
      })
    }

    res.json(JSONResponse);
  });
});

// ATP doubles rankings API response
router.get('/rankings/doubles', (req, res) => {

  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

  axios.get(ATP_DOUBLES_URL).then((response) => {
    const $ = cheerio.load(response.data);

    // Scraping rankings
    $('.mega-table tbody tr .rank-cell').each((i, td) => {
      rankings.push($(td).text().trim());
    });

    // Scraping countries
    $('.mega-table tbody tr .country-cell .country-inner .country-item img').each((i, img) => {
      countries.push($(img).attr('alt'));
    });

    // Scraping names
    $('.mega-table tbody tr .player-cell').each((i, td) => {
      players.push($(td).text().trim());
    });

    // Scraping ages
    $('.mega-table tbody tr .age-cell').each((i, td) => {
      ages.push($(td).text().trim());
    });

    // Scraping points
    $('.mega-table tbody tr .points-cell').each((i, td) => {
      points.push($(td).text().trim());
    });

    // Scraping tournaments played
    $('.mega-table tbody tr .tourn-cell').each((i, td) => {
      tournaments.push($(td).text().trim());
    });

    // console.log(names)

    for (let i = 0; i < rankings.length; i++){
      JSONResponse.push({
        "ranking": rankings[i],
        "country": countries[i],
        "player": players[i],
        "age": ages[i],
        "points": points[i],
        "tournaments_played": tournaments[i]
      })
    }

    res.json(JSONResponse);
  });
});

// ATP doubles rankings API response
router.get('/rankings/doubles-race', (req, res) => {

  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

  axios.get(ATP_DOUBLES_RACE).then((response) => {
    const $ = cheerio.load(response.data);

    // Scraping rankings
    $('.mega-table tbody tr .rank-cell').each((i, td) => {
      rankings.push($(td).text().trim());
    });

    // Scraping countries
    $('.mega-table tbody tr .country-cell .country-inner .country-item img').each((i, img) => {
      countries.push($(img).attr('alt'));
    });

    // Scraping names
    $('.mega-table tbody tr .player-cell').each((i, td) => {
      players.push($(td).text().trim());
    });

    // Scraping ages
    $('.mega-table tbody tr .age-cell').each((i, td) => {
      ages.push($(td).text().trim());
    });

    // Scraping points
    $('.mega-table tbody tr .points-cell').each((i, td) => {
      points.push($(td).text().trim());
    });

    // Scraping tournaments played
    $('.mega-table tbody tr .tourn-cell').each((i, td) => {
      tournaments.push($(td).text().trim());
    });

    // console.log(names)

    for (let i = 0; i < rankings.length; i++){
      JSONResponse.push({
        "ranking": rankings[i],
        "country": countries[i],
        "player": players[i],
        "age": ages[i],
        "points": points[i],
        "tournaments_played": tournaments[i]
      })
    }

    res.json(JSONResponse);
  });
});

/* ATP STATISTICS*/

// ATP stats leaderboard serve leaders API response
router.get('/stats/serve-leaders', function (req, res) {
  let players = [];
  axios.get(SERVICE_GAMES_WON_URL).then((response) => {
    const $ = cheerio.load(response.data);

    $('.stats-listing-info-cell table tbody tr td').each((i, td) =>{
    });

    $('.stats-listing-name a').each((i, a) => {
      players.push($(a).text())
    });

    res.json({
      status: 'serve leaders!'
    })
  });
});

// Export API routes
module.exports = router;