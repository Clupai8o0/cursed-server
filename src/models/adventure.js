const mongoose = require("mongoose");
const Filter = require("bad-words");
const filter = new Filter();

const adventureSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    trim: true,
  },
  id: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    validate: (value) => {
      if (filter.isProfane(value))
        throw new Error(
          "The description contains profane words. Please remove them or filter them"
        );
    },
    default: "No description...",
  },
  requirements: {
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 200,
    },
    time: {
      type: Number,
      required: true,
      min: 360,
      max: 259300,
    },
    atk: {
      type: Number,
      required: true,
    },
    def: {
      type: Number,
      required: true,
    },
  },
  reward: {
    money: {
      type: Number,
      required: true,
      min: 2,
      max: 10000000,
    },
    xp: {
      type: Number,
      required: true,
      min: 100,
      max: 10000000,
    },
  },
  url: {
    type: String,
    default: "",
  },
  events: {
    type: Array,
    default: [],
  },
});

const adventure = mongoose.model("Adventure", adventureSchema);

module.exports = adventure;
