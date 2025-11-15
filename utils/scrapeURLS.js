// ATP URLs
const ATP_BASE = 'https://www.atptour.com/en/rankings';

const ATP_SCRAPE_URLS = {
  singles: `${ATP_BASE}/singles`,
  singlesRace: `${ATP_BASE}/singles-race-to-turin`,
  doubles: `${ATP_BASE}/doubles`,
  doublesRace: `${ATP_BASE}/doubles-team-rankings`,
};

// WTA URLs
const WTA_BASE = 'https://api.wtatennis.com/tennis/players';

const WTA_SCRAPE_URLS = {
  singles: `${WTA_BASE}/ranked?page=0&pageSize=100&type=rankSingles&sort=asc&name=&metric=SINGLES`,
  singlesRace: `${WTA_BASE}/ranked?page=0&pageSize=100&type=RankChampSingles&sort=asc&name=&metric=CHAMPSINGLES`,
  doubles: `${WTA_BASE}/ranked?page=0&pageSize=100&type=rankDoubles&sort=asc&name=&metric=DOUBLES`,
  doublesRace: `${WTA_BASE}/ranked/champDoubles?page=0&pageSize=1000&type=rank&sort=asc&name=`,
};

module.exports = {
  ATP_SCRAPE_URLS,
  WTA_SCRAPE_URLS,
};