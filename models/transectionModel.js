const mongoose = require("mongoose");

//schema
const transectionSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: [true, "Please add a userid"],
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },

    type: {
      type: String,
      required: [true, "Please add an type"],
    },
    category: {
      type: String,
      required: [true, "Please add an Category"],
    },

    reference: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Please add an Description"],
    },
    date: {
      type: Date,
      default: Date.now,
      required: [true, "Please add a date"],
    },
  },
  {}
);

const transectionModel = mongoose.model("transections", transectionSchema);
module.exports = transectionModel;
