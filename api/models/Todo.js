const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("Todo", TodoSchema);
