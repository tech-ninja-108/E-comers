import mongoose from "mongoose";

const listSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const listModel = new mongoose.model("category", listSchema);

export default listModel;
