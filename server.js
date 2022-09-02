const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3003;
const { notes } = require('./develop/db/db.json');
const app = express();

app.use(express.static('develop/public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data

app.use(express.json());
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/index.html'));
});


app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './develop/db/db.json'))
})



// THIS APP.GET BELOW MUST BE THE LAST ROUTE EXPRESSED!!!!!!
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/index.html'));
});

app.post('/api/notes', (req, res) => {
  res.json(notes);
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});