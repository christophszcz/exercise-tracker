const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// prettify the json responses
app.set('json spaces', 2);

let idValue = 0;
let users = [];

app.use(cors());
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/users', (req, res) => {
  const urlResponse = { username: undefined, _id: undefined };
  const username = req.body.username;
  const id = idValue++;

  urlResponse.username = username;
  urlResponse._id = id;
  users.push(urlResponse);
  res.json(urlResponse);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users/:_id/exercises', (req, res) => {
  const userId = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  let date = req.body.date;

  if (!req.params.date) {
    const currentDate = new Date();
    date = currentDate.toUTCString();
  } else {
    date = new Date(req.body.date);
  }

  const urlResponse = {
    _id: userId,
    description: description,
    duration: duration,
    date: date
  };

  res.json(urlResponse);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is here: ' + `http://localhost:${listener.address().port}`);
})
