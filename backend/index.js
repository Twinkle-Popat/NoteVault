const connecttomongo = require('./db');
const { query, validationResult } = require('express-validator');

connecttomongo();

const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})