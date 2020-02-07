var express = require("express");
var path = require("path");
var fs = require("fs")
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Notes
// =============================================================
var note = [
  {
    title: "title",
    text: "note"
  },
];

// HTML Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../develop/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));

});

// API Routes save to db.json
app.post("/api/notes", function(req, res) {
var newNote = req.body;
console.log(newNote)
fs.appendFile(__dirname + "/db/db.json", JSON.stringify(newNote), function(error, data) {
    if(error) {
        return error
    }
})
  res.json(newNote);
})

// Pull from db.json
app.get("/api/notes", function(req, res) {
  fs.readFile(__dirname + "/db/db.json", 'utf8', function(error, data){
    if (error) {
        return console.log(error)
    }
    console.log(data)
  })
  res.json(newNote)
});

app.delete("/api/notes/:id", function(req, res) {

    var chosen = req.params.id

    console.log(chosen)
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
