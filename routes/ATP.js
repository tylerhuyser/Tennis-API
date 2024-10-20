const router = require('express').Router();
const axios  = require('axios');
const cheerio = require('cheerio');

// ATP URLS
const ATP_SINGLES_URL = 'https://www.atptour.com/en/rankings/singles';
const ATP_SINGLES_RACE_URL = 'https://www.atptour.com/en/rankings/singles-race-to-turin';
const ATP_DOUBLES_URL = 'https://www.atptour.com/en/rankings/doubles';
const ATP_DOUBLES_RACE_URL = 'https://www.atptour.com/en/rankings/doubles-team-rankings'

/* ATP RANKINGS */
async function getATPSinglesRankings() {

  try {

    let response = await axios.get(ATP_SINGLES_URL, {
      headers:
        {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
      },
        { timeout: 2 }
    )

    return response
    
  } catch (error) {

    console.log("Error - Atp Singles - BEGIN")
    console.log(error.response)
    console.log(error.response.status)
    console.log(error.response.data)
    console.log("Error ATP Singles - END")

  }

}

// ATP singles rankings API response
router.get('/rankings/singles', async (req, res) => {

  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

  try {
    const axiosResponse = await axios.get(ATP_SINGLES_URL, {
      headers:
        {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
      },
        { timeout: 2 }
    )
  
    console.log("Inside ATP Singles Call")
  
    const $ = cheerio.load(axiosResponse.data);
  
      // Scraping rankings
    $('.mega-table tbody tr .rank.bold.heavy').each((i, td) => {
      rankings.push($(td).text().trim());
    });
  
      // Scraping countries
    $('.mega-table tbody tr .player .player-stats .avatar .atp-flag use').each((i, use) => {
      countries.push($(use).attr('href').split('/assets/atptour/assets/flags.svg#flag-')[1].toUpperCase());
    });
  
      // Scraping names
    $('.mega-table tbody tr .player .player-stats .name a span').each((i, span) => {
       players.push($(span).text().trim());
    });
  
      // Scraping ages
    $('.mega-table tbody tr .age').each((i, td) => {
       ages.push($(td).text().trim());
    });
  
      // Scraping points
    $('.mega-table tbody tr .points a').each((i, a) => {
      points.push($(a).text().trim());
    });
  
      // Scraping tournaments played
    $('.mega-table tbody tr .tourns').each((i, td) => {
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
  
    // console.log(JSONResponse)
    res.json(JSONResponse);
  
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch ATP Singles Rankingls' });
  }
})


// ATP Race to London API response
router.get('/rankings/singles-race', (req, res) => {

  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

  axios.get(ATP_SINGLES_RACE_URL, {
    headers:
      {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
  },
    { timeout: 2 }
  ).then((response) => {

    console.log("Inside ATP Singles Race Call")
    console.log(response)
    console.log(response.data)

    const $ = cheerio.load(response.data);

    // Scraping rankings
    $('.mega-table tbody tr .rank').each((i, td) => {
      rankings.push($(td).text().trim());
    });

    // Scraping countries
    $('.mega-table tbody tr .player .player-stats .avatar .atp-flag use').each((i, use) => {
      countries.push($(use).attr('href'));
    });

    // Scraping names
    $('.mega-table tbody tr .player .player-stats .name a span').each((i, span) => {
      players.push($(span).text().trim());
    });

    // Scraping ages
    $('.mega-table tbody tr .age').each((i, td) => {
      ages.push($(td).text().trim());
    });

    // Scraping points
    $('.mega-table tbody tr .points').each((i, td) => {
      points.push($(td).text().trim());
    });

    for (let i = 0; i < rankings.length; i++){
      JSONResponse.push({
        "ranking": rankings[i],
        "country": countries[i],
        "player": players[i],
        "age": ages[i],
        "points": points[i],
        "tournaments_played": null
      })
    }

    console.log(JSONResponse)

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

  axios.get(ATP_DOUBLES_URL, {
    headers:
      {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
  },
    { timeout: 2 }
  ).then((response) => {

    console.log("Inside ATP Doubles Call")
    console.log(response)
    console.log(response.data)

    const $ = cheerio.load(response.data);

    // Scraping rankings
    $('.mega-table tbody tr .rank').each((i, td) => {
      rankings.push($(td).text().trim());
    });

    // Scraping countries
    $('.mega-table tbody tr .player .player-stats .avatar .atp-flag use').each((i, use) => {
      countries.push($(use).attr('href'));
    });

    // Scraping names
    $('.mega-table tbody tr .player .player-stats .name a span').each((i, span) => {
      players.push($(span).text().trim());
    });

    // Scraping ages
    $('.mega-table tbody tr .age').each((i, td) => {
      ages.push($(td).text().trim());
    });

    // Scraping points
    $('.mega-table tbody tr .points a').each((i, a) => {
      points.push($(a).text().trim());
    });

    // Scraping tournaments played
    $('.mega-table tbody tr .tourns').each((i, td) => {
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

  axios.get(ATP_DOUBLES_RACE_URL, {
    headers:
      {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
  },
    { timeout: 2 }
  ).then((response) => {


    console.log("Inside ATP Doubles Race Call")
    console.log(response)
    console.log(response.data)

    const $ = cheerio.load(response.data);

    // Scraping rankings
    $('.mega-table tbody tr .rank').each((i, td) => {
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

// Export API routes
module.exports = router;