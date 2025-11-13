//SERVER.JS
const path = require('path');
const express = require('express');
const app = express();

//Everything in /public as a static file
//Tells express to serve any file inside public dir
app.use(express.static(path.join(__dirname, 'public')));

//Routes that will send the correct files
//home page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//create survey page
app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create.html'));
});
//view survey page
app.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'list.html'));
});

//Starting up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));