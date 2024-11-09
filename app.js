const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors())
 
const routes = require('./routes');

app.use("/api", routes);

app.listen(process.env.PORT || 3500, () => {
  console.log('Example app listening on port 3500!')
});