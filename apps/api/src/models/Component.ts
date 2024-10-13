const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/** Components */
const Component = new Schema({
  id: String,
  ref: String,
  name: String,
  content: Array,
});

export default mongoose.model("Component", Component);
