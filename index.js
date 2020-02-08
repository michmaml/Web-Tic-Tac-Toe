const express = require('express');
const app = express();
var path = require('path');
const PORT = process.env.port || 3000;

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});