const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: Number,
  Title: String,
  Cat: String,
  Price: { type: Number, required: true },
  Img: String,
  Description: String,
  Luotban: String,
});

module.exports = mongoose.model("Product", ProductSchema);
