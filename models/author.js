const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Book = require("../models/book");

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
// Virtual for author's formatted lifespan
AuthorSchema.virtual("lifespan").get(function () {
  if (this.date_of_birth && this.date_of_death) {
    // Format when both birth and death dates are present
    return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    )} - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    )}`;
  } else if (this.date_of_birth) {
    // Format when only birth date is present
    return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    )} `;
  } else if (this.date_of_death) {
    // Format when only death date is present
    return ` ${DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    )}`;
  } else {
    // Return an empty string if neither birth nor death dates are available
    return "";
  }
});

module.exports = mongoose.model("Author", AuthorSchema);
