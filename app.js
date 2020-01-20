const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res) => {
  const { first, last, email } = req.body
  console.log(first, last, email)
  res.send('done')
})

app.listen(3000, () => {console.log('Srv running on 3000')})