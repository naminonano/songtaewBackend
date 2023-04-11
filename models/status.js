const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const statusSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  carId: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longtitude: {
    type: Number,
    required: true,
  },
  heading: {
    type: Number,
    required: true,
  },
  previousStation: Number,
});
// const locationSchema = new Schema({
//   from: {
//     type: String,
//     required: true,
//   },
//   to: {
//     type: String,
//     required: true,
//   },
//   distance: {
//     type: String,
//     required: true,
//   },
//   duration: {
//     type: String,
//     required: true,
//   },

//   _id: {
//     type: Schema.Types.ObjectId,
//     required: true,
//   },
// });

module.exports = mongoose.model("status", statusSchema, "status");
