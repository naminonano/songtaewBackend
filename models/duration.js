const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const locationSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },

  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Duration", locationSchema, "duration");
