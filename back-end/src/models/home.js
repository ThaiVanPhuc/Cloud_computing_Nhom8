const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Image: { type: String, required: true },
    Description: { type: String, required: true },
});

module.exports = mongoose.model("HomeProduct", HomeSchema);
