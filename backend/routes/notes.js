const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/auth");

const router = express.Router();

// Create note
router.post("/", auth, async (req, res) => {
  const { title, content, tags, isPinned, isArchived, color } = req.body;

  try {
    const newNote = new Note({
      user: req.user.id,
      title,
      content,
      tags: Array.isArray(tags) ? tags : (typeof tags === 'string' && tags ? tags.split(',').map(t => t.trim()) : []),
      isPinned: !!isPinned,
      isArchived: !!isArchived,
      color: color || undefined
    });

    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error('Create note error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get notes (supports ?limit= and ?filter= pinned|archived)
router.get("/", auth, async (req, res) => {
  try {
    const { limit, filter } = req.query;
    const query = { user: req.user.id };

    if (filter === 'pinned') query.isPinned = true;
    if (filter === 'archived') query.isArchived = true;

    let q = Note.find(query).sort({ updatedAt: -1 });
    if (limit && !Number.isNaN(parseInt(limit))) q = q.limit(parseInt(limit));

    const notes = await q.exec();
    res.json(notes);
  } catch (err) {
    console.error('Fetch notes error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update note
router.put("/:id", auth, async (req, res) => {
  const { title, content, tags, isPinned, isArchived, color } = req.body;

  try {
    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: "Note not found" });

    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    if (typeof title !== 'undefined') note.title = title;
    if (typeof content !== 'undefined') note.content = content;
    if (typeof tags !== 'undefined') note.tags = Array.isArray(tags) ? tags : (typeof tags === 'string' && tags ? tags.split(',').map(t => t.trim()) : []);
    if (typeof isPinned !== 'undefined') note.isPinned = !!isPinned;
    if (typeof isArchived !== 'undefined') note.isArchived = !!isArchived;
    if (typeof color !== 'undefined') note.color = color;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    console.error('Update note error', err);
    res.status(500).json({ msg: 'Server error' });
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

// Toggle pin
router.put('/:id/pin', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    note.isPinned = !note.isPinned;
    await note.save();
    return res.json(note);
  } catch (err) {
    console.error('Toggle pin error', err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// Toggle archive
router.put('/:id/archive', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    note.isArchived = !note.isArchived;
    await note.save();
    return res.json(note);
  } catch (err) {
    console.error('Toggle archive error', err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
