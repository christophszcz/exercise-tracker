const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/exercise/new-user', function(req, res) {
  res.json({ username: 'test' });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is here: ' + `http://localhost:${listener.address().port}`);
})
