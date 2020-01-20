const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
require('dotenv/config')

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res) => {
  const { first, last, email } = req.body
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: first,
          LNAME: last
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data)

  const options = {
    url: process.env.API_URL,
    method: 'POST',
    headers: {
      'Authorization': process.env.API_AUTH_KEY
    },
    body: jsonData
  }

  request(options, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      res.sendFile(__dirname + '/failure.html')
    } else if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html')
    }
  })
})

app.post('/failure', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => {console.log(`Srv running on ${port}`)})
