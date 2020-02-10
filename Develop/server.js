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
app.use(express.static("public"));

var notes = require("./db/db.json")

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
var id = notes.length + 1
var newNote = {title: req.body.title, text: req.body.text, id: id}
var completeNotes = notes.concat(newNote)

fs.writeFile(__dirname + "/db/db.json", JSON.stringify(completeNotes), function(error, data) {
    if(error) {
        return error
    }
})
  console.log(completeNotes)
  res.json(completeNotes);
})

// Pull from db.json
app.get("/api/notes", function(req, res) {
  fs.readFile(__dirname + "/db/db.json", 'utf8', function(error, data){
    if (error) {
        return console.log(error)
    }
    console.log("This is Notes", notes)
  })
  res.json(notes)
});

app.delete("/api/notes/:id", function(req, res) {
    const noteId = JSON.parse(req.params.id)
    console.log(noteId)
  
    const filtered_list = notes.filter(val => val.id !== noteId)

    notes = filtered_list

    console.log(notes)

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function(error, data) {
      if(error) {
          return error
      }
      res.json(notes)
  })
})

// server.delete("/items/:id", (req, res) => {
//   const itemId = req.params.id;

//   console.log("Delete item with id: ", itemId);

//   // filter list copy, by excluding item to delete
//   const filtered_list = data.filter(item => item.id !== itemId);

//   // replace old list with new one
//   data = filtered_list;

//   res.json(data);
// });

// const noteId = req.params.id

//     fs.readFile(__dirname + "/db/db.json", 'utf8', function(error, data){
//     if (error) {
//         return console.log(error)
//     }
//     for (let i = 0; i < notes.length; i ++) {
//         console.log(notes[1].id)
//         if (notes[i].id === noteId) {
//             deleteNote();
//         }
//     }
//     console.log(notes)
//     res.json(notes);

//const deletedNote = notes.some(notes => notes.id == noteId);
//console.log(deletedNote);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
