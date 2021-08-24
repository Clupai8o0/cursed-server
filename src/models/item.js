const mongoose = require("mongoose")
const Filter = require("bad-words")
const filter = new Filter();
const fs = require("fs")

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  id: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    validate: (value) => {
      if (filter.isProfane(value))
        throw new Error(
          "The description contains profane words. Please remove/filter them"
        )
    },
    default: "No description..."
  },
  type: {
    type: String,
    lowercase: true,
    required: true,
    validate: (value) => {
      const jsonData = JSON.parse(fs.readFileSync("src/data/json/item.json"));
      if (
        jsonData.types.filter((type) => {
          return type.name.toLowerCase() === value.toLowerCase();
        }).length === 0
      )
        throw new Error("The given type for item does not exist");
    }
  },
  feature: {
    type: Object,
    lowercase: true,
    required: true
  },
  value: {
    type: Number,
    min: 0,
    max: 1000000000,
    default: 10
  },
  durability: {
    type: Number,
    min: 1,
    max: 100,
    default: 100
  },
  atk: {
    type: Number,
    required: true
  },
  def: {
    type: Number,
    required: true
  },
  spd: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    default: '',
    trim: true
  },
  duplicate: {
    type: Object,
    required: true
  }
})

const item = mongoose.model("Item", itemSchema);
module.exports = item;