const express = require('express')
const app = express()
const port = 3000

require('./handles')(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})