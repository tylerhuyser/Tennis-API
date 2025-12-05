const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())
 
const routes = require('./routes');

app.use("/api", routes);

app.post('/trigger-crawl', async (req, res) => {
  const authHeader = req.headers['x-api-key'];
  if (authHeader !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { exec } = require('child_process');
  exec('node cronScripts/populateCache.mjs', (error, stdout, stderr) => {
    if (error) {
      console.error(`Crawl error: ${error}`);
      return;
    }
    console.log(stdout);
  });
  
  res.json({ message: 'Crawl triggered' });
});

app.listen(process.env.PORT || 3500, () => {
  console.log('Example app listening on port 3500!')
});