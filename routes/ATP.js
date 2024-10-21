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
    res.status(500).json({ error: 'Failed to fetch ATP Singles Rankings.' });
  }
})


// ATP Race to London API response
router.get('/rankings/singles-race', async (req, res) => {

  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let JSONResponse = [];


  try { 
    const axiosResponse = await axios.get(ATP_SINGLES_RACE_URL, {
      headers:
        {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
    },
      { timeout: 2 }
    )
  
      console.log("Inside ATP Singles Race Call")

      console.log(axiosResponse.data)
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
        })
      }
  
      console.log(JSONResponse)
  
      res.json(JSONResponse);

  }  catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch ATP Singles Race Rankings.' });
  }
});

// ATP doubles rankings API response
router.get('/rankings/doubles', async (req, res) => {

  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

  try {

    const axiosResponse = await axios.get(ATP_DOUBLES_URL, {
      headers:
        {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
    },
      { timeout: 2 }
    )
  
      console.log("Inside ATP Doubles Call")
  
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
  
      res.json(JSONResponse);

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch ATP Doubles Rankings.' });
  }
});

// ATP doubles rankings API response
router.get('/rankings/doubles-race', async (req, res) => {

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

  try {
    const axiosResponse = await axios.get(ATP_DOUBLES_RACE_URL, {
      headers:
        {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
      },
        { timeout: 2 }
    )
  
    console.log("Inside ATP Doubles Race Call")
  
    const $ = cheerio.load(axiosResponse.data);
  
      // Scraping rankings
    $('.mega-table tbody tr .rank.bold.heavy').each((i, td) => {
      rankings.push($(td).text().trim());
    });
  
      // Scraping countries (Player 1)
    $('.mega-table tbody tr .player .player-stats .name .player1 .atp-flag use').each((i, use) => {
      playerOneCountry.push($(use).attr('href').split('/assets/atptour/assets/flags.svg#flag-')[1].toUpperCase())
    });

         // Scraping countries (Player 2)
    $('.mega-table tbody tr .player .player-stats .name .player2 .atp-flag use').each((i, use) => {
      playerTwoCountry.push($(use).attr('href').split('/assets/atptour/assets/flags.svg#flag-')[1].toUpperCase())
    });
  
      // Scraping Names (Player 1)
    $('.mega-table tbody tr .player .player-stats .name .player1 a').each((i, span) => {
       playerOneName.push($(span).attr('href').split("/")[3].split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ").trim())
    });

    // Scraping Names (Player 2)
    $('.mega-table tbody tr .player .player-stats .name .player2 a').each((i, span) => {
      playerTwoName.push($(span).attr('href').split("/")[3].split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ").trim())
    });

    // Scraping Ages
    $('.mega-table tbody tr .age.tiny-cell').each((i, td) => {
      playerOneAge.push($(td).text().split("/")[0].trim())
      playerTwoAge.push($(td).text().split("/")[1].trim())
    });
  
      // Scraping points
    $('.mega-table tbody tr .points').each((i, td) => {
      points.push($(td).text().trim());
    });
  
    for (let i = 0; i < rankings.length; i++){
      JSONResponse.push({
        "ranking": rankings[i],
        "player1": {
          "fullName": playerOneName[i],
          "countrCode": playerOneCountry[i],
          "age": playerOneAge[i]
        },
        "player2": {
          "fullName": playerTwoName[i],
          "countrCode": playerTwoCountry[i],
          "age": playerTwoAge[i]
        },
        "points": points[i],
      })
    }
  
    // console.log(JSONResponse)
    res.json(JSONResponse);
  
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch ATP Doubles Race Rankings.' });
  }
});

// Export API routes
module.exports = router;