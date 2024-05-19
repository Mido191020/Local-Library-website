const mongoose = require("mongoose");
const AuthorSchema = new mongoose.Schema({
  firstNmae: {
    type: String,
    required: true,
    maxLength: 100,
  },
  familyNmae: {
    type: String,
    required: true,
    maxLength: 100,
  },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});
AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.firstName && this.familyName) {
    fullname = `${this.firstNmae}, ${this.familyNmae}`;
  }
  return fullname;
});
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});
module.exports = mongoose.model("Author", AuthorSchema);
