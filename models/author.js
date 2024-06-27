const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  familyName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.firstName && this.familyName) {
    fullname = `${this.familyName}, ${this.firstName}`;
  } else if (this.firstName) {
    fullname = `${this.firstName}`;
  } else if (this.familyName) {
    fullname = `${this.familyName}`;
  }
  return fullname.trim(); // Trim any leading or trailing whitespace
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id.toString()}`;
});

// Virtual for author's formatted lifespan
AuthorSchema.virtual("lifespan").get(function () {
  if (this.date_of_birth && this.date_of_death) {
    return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    )} - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    )}`;
  } else if (this.date_of_birth) {
    return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    )}`;
  } else if (this.date_of_death) {
    return `${DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    )}`;
  } else {
    return "";
  }
});

module.exports = mongoose.model("Author", AuthorSchema);
