const router = require('express').Router();
const axios  = require('axios');
const cheerio = require('cheerio');

// URLS
const WTA_SINGLES_URL = 'https://www.wtatennis.com/rankings/singles';
const WTA_SINGLES_RACE_URL = 'https://www.wtatennis.com/rankings/race-singles'
const WTA_DOUBLES_URL = 'https://www.wtatennis.com/rankings/doubles'
const WTA_DOUBLES_RACE_URL = 'https://www.wtatennis.com/rankings/race-doubles'

// WTA RANKINGS
async function getWTASinglesRankings() {
  try {

    let response = await axios.get(WTA_SINGLES_URL, {
      headers:
        {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
      },
        { timeout: 2 }
    )

    return response
    

  } catch (error) {

    console.log("Error - WTA Singles - BEGIN")
    console.log(error.response)
    console.log(error.response.status)
    console.log(error.response.data)
    console.log("Error WTA Singles - END")

  }
}
// WTA Singles Rankings API Response
router.get('/rankings/singles', async (req, response, next) => {
  
  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

  await axios.get(WTA_SINGLES_URL, {
    headers:
      {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
  },
    { timeout: 2 }
  ).then((response) => {

    console.log("Inside ATP Singles Call")
    console.log(response)
    console.log(response.data)

    const $ = cheerio.load(response.data);

    // Scraping rankings
    $('rankings__list tbody tr .rankings__cell .rankings__rank').each((i, span) => {
      rankings.push($(span).text().trim());
    });

    // Scraping countries
    $('rankings__list tbody tr .player td .flag').each((i, img) => {
      countries.push($(img).attr('alt'));
    });

    // Scraping names
    $('rankings__list tbody tr .rankings__cell--player a').each((i, a) => {
      players.push($(a).text().trim());
    });

    // Scraping ages
    $('rankings__list tbody tr .rankings__cell--age').each((i, td) => {
      ages.push($(td).text().trim());
    });

    // Scraping points
    $('rankings__list tbody tr .rankings__cell--points').each((i, td) => {
      points.push($(td).text().trim());
    });

    // Scraping tournaments played
    $('rankings__list tbody tr .rankings__cell--tournaments').each((i, td) => {
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

    response.json(JSONResponse);

  })
})

// WTA Singles Race Rankings API Response

router.get('/rankings/singles-race', async (req, response) => {
  
  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

  await axios.get(WTA_SINGLES_RACE_URL, {
    headers:
      {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
  },
    { timeout: 2 }
  ).then((response) => {

    console.log("Inside WTA Singles Race Call")
    console.log(response)
    console.log(response.data)

    const $ = cheerio.load(response.data);

    // Scraping rankings
    $('rankings__list tbody tr .rankings__cell .rankings__rank').each((i, span) => {
      rankings.push($(span).text().trim());
    });

    // Scraping countries
    $('rankings__list tbody tr .player td .flag').each((i, img) => {
      countries.push($(img).attr('alt'));
    });

    // Scraping names
    $('rankings__list tbody tr .rankings__cell--player a').each((i, a) => {
      players.push($(a).text().trim());
    });

    // Scraping ages
    $('rankings__list tbody tr .rankings__cell--age').each((i, td) => {
      ages.push($(td).text().trim());
    });

    // Scraping points
    $('rankings__list tbody tr .rankings__cell--points').each((i, td) => {
      points.push($(td).text().trim());
    });

    // Scraping tournaments played
    $('rankings__list tbody tr .rankings__cell--tournaments').each((i, td) => {
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

    response.json(JSONResponse);

  })
})

router.get('/rankings/doubles', async (req, response) => {
  
  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

  await axios.get(WTA_DOUBLES_URL, {
    headers:
      {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
  },
    { timeout: 2 }
  ).then((response) => {

    console.log("Inside WTA Doubles Call")
    console.log(response)
    console.log(response.data)

    const $ = cheerio.load(response.data);

    // Scraping rankings
    $('rankings__list tbody tr .rankings__cell .rankings__rank').each((i, span) => {
      rankings.push($(span).text().trim());
    });

    // Scraping countries
    $('rankings__list tbody tr .player td .flag').each((i, img) => {
      countries.push($(img).attr('alt'));
    });

    // Scraping names
    $('rankings__list tbody tr .rankings__cell--player a').each((i, a) => {
      players.push($(a).text().trim());
    });

    // Scraping ages
    $('rankings__list tbody tr .rankings__cell--age').each((i, td) => {
      ages.push($(td).text().trim());
    });

    // Scraping points
    $('rankings__list tbody tr .rankings__cell--points').each((i, td) => {
      points.push($(td).text().trim());
    });

    // Scraping tournaments played
    $('rankings__list tbody tr .rankings__cell--tournaments').each((i, td) => {
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

    response.json(JSONResponse);

  })
})

router.get('/rankings/doubles-race', async (req, response) => {
  
  let rankings = [];
  let countries = [];
  let players = [];
  let ages = [];
  let points = [];
  let tournaments = [];
  let JSONResponse = [];

  await axios.get(WTA_DOUBLES_RACE_URL, {
    headers:
      {'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'}
  },
    { timeout: 2 }
  ).then((response) => {

    console.log("Inside WTA Doubles Race Call")
    console.log(response)
    console.log(response.data)

    const $ = cheerio.load(response.data);

    // Scraping rankings
    $('rankings__list tbody tr .rankings__cell .rankings__rank').each((i, span) => {
      rankings.push($(span).text().trim());
    });

    // Scraping countries
    $('rankings__list tbody tr .player td .flag').each((i, img) => {
      countries.push($(img).attr('alt'));
    });

    // Scraping names
    $('rankings__list tbody tr .rankings__cell--player a').each((i, a) => {
      players.push($(a).text().trim());
    });

    // Scraping ages
    $('rankings__list tbody tr .rankings__cell--age').each((i, td) => {
      ages.push($(td).text().trim());
    });

    // Scraping points
    $('rankings__list tbody tr .rankings__cell--points').each((i, td) => {
      points.push($(td).text().trim());
    });

    // Scraping tournaments played
    $('rankings__list tbody tr .rankings__cell--tournaments').each((i, td) => {
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

    response.json(JSONResponse);

  })
})


// // WTA singles rankings API response
// router.get('/rankings/singles', (req, res) => {
//   axios.get(WTA_RANKINGS_URL).then((response) => {
//     const $ = cheerio.load(response.data)
//     console.log(response.data)
//     // console.log($('.dp-link').text())
//     res.json({status: 'wta singles!'})
//   });
// });

// WTA doubles rankings API response
router.get('/wta/doubles', (req, res) => {
});


// Export API routes
module.exports = router;