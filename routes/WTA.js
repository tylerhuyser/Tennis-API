const router = require('express').Router();
const axios  = require('axios');
const cheerio = require('cheerio');

// URLS
const WTA_SINGLES_URL = 'https://www.wtatennis.com/rankings/singles';
const WTA_SINGLES_RACE_URL = 'https://www.wtatennis.com/rankings/race-singles'
const WTA_DOUBLES_URL = 'https://www.wtatennis.com/rankings/doubles'
const WTA_DOUBLES_RACE_URL = 'https://www.wtatennis.com/rankings/race-doubles'

// WTA singles rankings API response
router.get('/rankings/singles', (req, res) => {
  axios.get(WTA_RANKINGS_URL).then((response) => {
    const $ = cheerio.load(response.data)
    console.log(response.data)
    // console.log($('.dp-link').text())
    res.json({status: 'wta singles!'})
  });
});

// WTA doubles rankings API response
router.get('/wta/doubles', (req, res) => {
});


// Export API routes
module.exports = router;