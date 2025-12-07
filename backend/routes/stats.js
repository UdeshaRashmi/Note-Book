const express = require("express");
const auth = require("../middleware/auth");
const Note = require("../models/Note");

const router = express.Router();

// GET /api/stats - returns simple dashboard statistics for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const totalNotes = await Note.countDocuments({ user: userId });
    const todayNotes = await Note.countDocuments({ user: userId, createdAt: { $gte: startOfToday } });
    const weekNotes = await Note.countDocuments({ user: userId, createdAt: { $gte: weekAgo } });

    // The Note model in this project does not currently include pinned/archived fields.
    // Counting those will return 0 by default; keep the keys so the frontend can rely on them.
    const pinnedNotes = await Note.countDocuments({ user: userId, isPinned: true });
    const archivedNotes = await Note.countDocuments({ user: userId, isArchived: true });

    const stats = {
      totalNotes,
      todayNotes,
      weekNotes,
      pinnedNotes: pinnedNotes || 0,
      archivedNotes: archivedNotes || 0,
    };

    // Return shape compatible with frontend's tolerant parsing
    return res.json({ stats });
  } catch (err) {
    console.error('Error generating stats', err);
    return res.status(500).json({ message: 'Server error while fetching stats' });
  }
});

module.exports = router;
