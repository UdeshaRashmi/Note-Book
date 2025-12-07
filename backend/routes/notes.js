const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/auth");

const router = express.Router();

// Create note
router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = new Note({
      user: req.user.id,
      title,
      content
    });

    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get all notes
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Update note
router.put("/:id", auth, async (req, res) => {
  const { title, content } = req.body;

  try {
    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: "Note not found" });

    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    note.title = title;
    note.content = content;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete note
router.delete("/:id", auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });

    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    await note.deleteOne();

    res.json({ msg: "Note deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
