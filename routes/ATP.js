// routes/ATP.js
const router = require('express').Router();
const { ATP_SCRAPE_URLS } = require("../utils/scrapeURLs");
const cachePaths = require('../utils/cachePaths');
const { serveRoute } = require('../utils/serveRoute');

const { scrapeATPSingles } = require('../scrapers/atpSinglesScraper');
const { scrapeATPSinglesRace } = require('../scrapers/atpSinglesRaceScraper');
const { scrapeATPDoubles } = require('../scrapers/atpDoublesScraper');
const { scrapeATPDoublesRace } = require('../scrapers/atpDoublesRaceScraper');

/* ROUTES */

// GET /atp/rankings/singles
router.get('/rankings/singles', async (req, res) => {
  await serveRoute(cachePaths.ATP_SINGLES, scrapeATPSingles, ATP_SCRAPE_URLS.singles, res);
});

// GET /atp/rankings/singles-race
router.get('/rankings/singles-race', async (req, res) => {
  await serveRoute(cachePaths.ATP_SINGLES_RACE, scrapeATPSinglesRace, ATP_SCRAPE_URLS.singlesRace, res);
});

// GET /atp/rankings/doubles
router.get('/rankings/doubles', async (req, res) => {
  await serveRoute(cachePaths.ATP_DOUBLES, scrapeATPDoubles, ATP_SCRAPE_URLS.doubles, res);
});

// GET /atp/rankings/doubles-race
router.get('/rankings/doubles-race', async (req, res) => {
  await serveRoute(cachePaths.ATP_DOUBLES_RACE, scrapeATPDoublesRace, ATP_SCRAPE_URLS.doublesRace, res);
});

module.exports = router;
