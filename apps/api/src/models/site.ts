const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/** Pages */
const Site = new Schema({
  id: String,
  name: String,
  domain: String,
  favicon: String,
  meta: Object,
});

export default mongoose.model("Site", Site);
