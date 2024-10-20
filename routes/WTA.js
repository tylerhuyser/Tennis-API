const router = require('express').Router();
const axios  = require('axios');
const cheerio = require('cheerio');

// URLS
const WTA_SINGLES_URL = 'https://api.wtatennis.com/tennis/players/ranked?page=0&pageSize=100&type=rankSingles&sort=asc&name=&metric=SINGLES';
const WTA_SINGLES_RACE_URL = 'https://api.wtatennis.com/tennis/players/ranked?page=0&pageSize=100&type=RankChampSingles&sort=asc&name=&metric=CHAMPSINGLES'
const WTA_DOUBLES_URL = 'https://api.wtatennis.com/tennis/players/ranked?page=0&pageSize=100&type=rankDoubles&sort=asc&name=&metric=DOUBLES'
const WTA_DOUBLES_RACE_URL = 'https://api.wtatennis.com/tennis/players/ranked/champDoubles?page=0&pageSize=1000&type=rank&sort=asc&name='

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
router.get('/rankings/singles', async (req, res) => {

  try { 

    const axiosResponse = await axios.get(WTA_SINGLES_URL, {
      headers:
        {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36'}
    },
      { timeout: 10000 }
    )
  
      console.log("Inside WTA Singles Race Call")
  
      // console.log(axiosResponse.data)

      res.json(axiosResponse.data);

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch WTA Singles Race Rankings' });
  }

})

// WTA Singles Race Rankings API Response

router.get('/rankings/singles-race', async (req, res) => {

  try { 

    const axiosResponse = await axios.get(WTA_SINGLES_RACE_URL, {
      headers:
        {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36'}
    },
      { timeout: 10000 }
    )
  
      console.log("Inside WTA Singles Call")
  
      // console.log(axiosResponse.data)

      res.json(axiosResponse.data);

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch WTA Singles Rankings' });
  }

})

router.get('/rankings/doubles', async (req, res) => {
  
  try { 

    const axiosResponse = await axios.get(WTA_DOUBLES_URL, {
      headers:
        {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36'}
    },
      { timeout: 10000 }
    )
  
      console.log("Inside WTA Doubles Call")
  
      // console.log(axiosResponse.data)

      res.json(axiosResponse.data);

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch WTA Doubles Rankings' });
  }
})

router.get('/rankings/doubles-race', async (req, res) => {
  
  try { 

    const axiosResponse = await axios.get(WTA_DOUBLES_RACE_URL, {
      headers:
        {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36'}
    },
      { timeout: 10000 }
    )
  
      console.log("Inside WTA Doubles Race Call")
  
      // console.log(axiosResponse.data)

      res.json(axiosResponse.data);

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch WTA Doubles Race Rankings' });
  }
})

// Export API routes
module.exports = router;