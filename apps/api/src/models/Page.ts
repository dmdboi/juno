const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/** Pages */
const Page = new Schema({
  id: String,
  name: String,
  ref: String,
  content: Array,

  data: Object,
  meta: Object,

  // Template ID
  template: String,

  // Slot to insert the page content into
  slot: String,
});

export default mongoose.model("Page", Page);
