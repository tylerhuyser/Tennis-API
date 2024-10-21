const express = require('express')
const app = express();

const routes = require('./routes');

app.use("/api", routes);

app.listen(process.env.PORT || 3500, () => {
  console.log('Example app listening on port 3500!')
});