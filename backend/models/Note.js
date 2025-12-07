const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  tags: [{ type: String }],
  color: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);
