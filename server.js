const PORT = process.env.PORT || 3333;
const express = require('express');
const fs = require('fs');
const path = require('path');

// const htmlRoutes = require('./routes/htmlRoutes');
// const apiRoutes = require('./routes/apiRoutes');

const allNotes = require('./db/db.json');

const app = express();

app.use(express.static('/public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

let notesData = [];

// function createNewNote(body) {
//     console.log(body);
//     return body;
// }

app.use('/', htmlRoutes)

// THESE ARE MY ROUTES
// HTML ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// API ROUTES
app.get("/api/notes", (req, res) => {
    // res.sendFile(path.join(__dirname, './db/db.json'))
    try {
    notesData = fs.readFileSync("db/db.json", "utf-8");
    console.log("hello!");
    notesData = JSON.parse(notesData);
    } catch (error) {
        console.log("ERROR");
    }
    res.json(notesData);
});

app.post('/api/notes', (req, res) => {
    notesData = fs.readFileSync('./db/db.json', 'utf-8');
    console.log(notesData);

    // parse data of an array of objects
    notesData = JSON.parse(notesData);
    // set the notes' id
    req.body.id = notesData.length;
    // add new note to the array
    notesData.push(req.body);
    notesData = JSON.stringify(notesData);
    // write new note to file
    fs.writeFileSync('./db/db.json', notesData, 'utf-8', (err) => {
        if (err) throw err
    });
    // change it back to an array and send back to the browser
    // res.json(JSON.parses(notesData));
  });

app.delete("/api/notes/:id", (req, res) => {
    notesData = fs.readFileSync('./db/db.json', 'utf-8');
    // parse data to get an array of objects
    notesData = JSON.parse(notesData);
    // delete old note from the array of objects
    notesData = notesData.filter((note) => {
        return note.id != req.params.id;
    });
    // make it a string again
    notesData = JSON.stringify(notesData);
    // write the new notes to the file again (minus the one we scratched)
    fs.writeFileSync('./db/db.json', notesData, 'utf-8', (err) => {
        if (err) throw err;
    });

    // change back to an array of objects; send to the user
    // res.send(JSON.parse(notesData));

})

// THIS APP.GET BELOW MUST BE THE LAST ROUTE EXPRESSED!!!!!!
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});