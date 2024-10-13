const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/** Templates */
const Template = new Schema({
  id: String,
  ref: String,
  name: String,
  content: Array,
});

export default mongoose.model("Template", Template);
