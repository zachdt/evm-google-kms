const express = require('express')

const app = express()

const routes
app.get('/', (req, res) => {

  req.headers()
  res.send('Hello')
  console.log('Hello')
})

app.get('/', (req, res) => {
  res.send()
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`---> kaleido-google-kms started on port ${port}`)
})