const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  totalratings: {
    type: String,
    required: true,
  },
  type1: {
    type: String,
    required: true,
  },
  type2: {
    type: String,
    required: true,
  },
  type3: String,
  phone: {
    type: String,
    required: true,
  },
  ggmapurl: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  open0: String,
  close0: String,
  timetext0: String,
  open1: String,
  close1: String,
  timetext1: String,
  open2: String,
  close2: String,
  timetext2: String,
  open3: String,
  close3: String,
  timetext3: String,
  open4: String,
  close4: String,
  timetext4: String,
  open5: String,
  close5: String,
  timetext5: String,
  open6: String,
  close6: String,
  timetext6: String,
  pricelevel: String,
  finaltype: {
    type: String,
    required: true,
  },
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema, "info");
// let sc = new mongoose.Schema({
//     from: String,
//     to: String,
//     duration: String,
//     distance: String,
//     id: Number,
//   });
