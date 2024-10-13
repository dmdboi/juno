const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/** TemplateComponent */
const TemplateComponent = new Schema({
  id: String,
  template_id: String,
  component_id: String,
});

export default mongoose.model("TemplateComponent", TemplateComponent);
