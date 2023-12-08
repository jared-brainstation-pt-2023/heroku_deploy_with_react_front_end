const express = require("express");
const router = express.Router(); // To use router, instantiate it like this
const fs = require("fs");
const uniqid = require("uniqid");
const path = require("path");

// Re-usable function to read our data file
function readNotes() {
    const notesData = fs.readFileSync(path.join(__dirname + "/../data/notes.json"));
    const parsedData = JSON.parse(notesData);
    return parsedData;
}

// This middleware runs on every request to this router
router.use((_req, _res, next) => {
    console.log("Middleware from notes router");
    next();
});

// GET endpoint for all notes
router.get("/", (_req, res) => {
    // Respond with the notes data from our file
    console.log(readNotes())
    res.json(readNotes());
});

// GET endpoint for an invididual note
router.get("/:noteId", (req, res) => {
    // Read the file and find the single note whose id matches the requested id
    const notes = readNotes();
    const singleNote = notes.find((note) => note.id === req.params.noteId);

    // This would be a good place to check if the note was found 👀

    // Respond with the single note
    res.json(singleNote);
});

// POST endpoint to add a note
router.post("/", (req, res) => {
    // Make a new note with a unique ID
    const newNote = {
        id: uniqid(),
        title: req.body.title,
        content: req.body.content,
    };

    // 1. Read the current notes array
    // 2. Add to the notes array
    // 3. Write the entire new notes array to the file
    const notes = readNotes();
    notes.push(newNote);
    fs.writeFileSync("./data/notes.json", JSON.stringify(notes));

    // Respond with the note that was created
    res.status(201).json(newNote);
});

// DELETE endpoint to remove an individual note
router.delete("/:id", (req, res) => {
    /* TODO: ACTUALLY DELETE A NOTE */
    console.log(`TODO: Delete note with the ID ${req.params.id}`);

    /* TODO: ACTUALLY DO THESE STEPS */
    // 1. Read from the file
    // 2. Mutate the array to remove the note with that id
    // 3. Write the new array to the file

    // Respond with a message that the note has been deleted
    res.status(204).send("You deleted a note");
});

// Finally, export the router for use in index.js
module.exports = router;
