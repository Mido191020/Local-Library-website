const mongoose = require("mongoose");
//const Schema = mongoose.Schema; // Import the Schema object

const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
    },
});
GenreSchema.virtual("url").get(function() {
    return `/catalog/genre/${this._id}`;
});
module.exports = mongoose.model("genre", GenreSchema);