const express = require("express");
const router = express.Router();
const Item = require("../models/item.js");
const resp = require("../helper/response.js");
const { ItemId } = require("../helper/algorithm");
const fs = require("fs");

//* Adding a item
router.post("/add/item", async (req, res) => {
  const { name, description, type, feature, value, atk, def, spd, url } =
    req.body;
  try {
    const id = ItemId(type, feature.feature, feature.duo, await Item.find({}));
    const item = new Item({
      name,
      id,
      description,
      type,
      feature,
      value,
      atk,
      def,
      spd,
      url,
      duplicate: {
        name,
        id,
        type,
        value,
        feature,
        durability: 100,
        atk,
        def,
        spd,
      },
    });
    await item.save();
    res.status(201).send(resp(true, "Successfully created item"));
  } catch (e) {
    res.status(500).send(resp(false, e));
  }
});

//* Getting all the items
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find({});
    if (!items)
      return res
        .status(500)
        .send(resp(false, "There is a problem with the database"));

    res.status(200).send(resp(true, items));
  } catch (err) {
    res.status(500).send(resp(false, err));
  }
});

//* Getting a particular item
router.get("/item/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const item = await Item.findOne({ id });
    if (!item) return res.status(500).send(resp(false, "Could not find item"));

    res.status(200).send(resp(true, item));
  } catch (err) {
    res.status(500).send(resp(false, err));
  }
});

//* Deleting a item
router.delete("/delete/item/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Item.deleteOne({ id });
    res.status(200).send(resp(true, "Deleted item"));
  } catch (e) {
    res.status(500).send(resp(false, e));
  }
});

//todo make changes in item post
//todo get for item types
//* Adding a type
router.put("/add/item-type", async (req, res) => {
  const { name, description, id, type, features } = req.body;
  try {
    if (name === undefined || name === null)
      return res.status(400).send(resp(false, "Missing parameter name."));
    if (description === undefined || description === null)
      return res
        .status(400)
        .send(resp(false, "Missing parameter description."));
    if (id === undefined || id === null)
      return res.status(400).send(resp(false, "Missing parameter id"));
    if (type === undefined || type === null)
      return res.status(400).send(resp(false, "Missing parameter type"));
    if (features === undefined || features === null)
      return res.status(400).send(resp(false, "Missing parameter features"));

    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof id !== "string" ||
      typeof type !== "string"
    )
      return res
        .status(400)
        .send(
          resp(false, "Parameter name, description, id, type must be a string")
        );
    if (typeof features !== "object")
      return res
        .status(400)
        .send(resp(false, "Parameter features must be an array"));
    if (features.length === 0)
      return res.status(400).send(resp(false, "Features is empty"));

    const data = JSON.parse(fs.readFileSync("src/data/json/item.json"));
    data.types.push({
      name: name.toLowerCase(),
      description,
      id,
    });
    data[type].push(name.toLowerCase());
    data.features[name.toLowerCase()] = features;
    const letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    const _features = data.features[name.toLowerCase()];

    for (let i = 0; i < _features.length; i++) {
      if (_features[i].feature === "unique") {
        _features[i]["id"] = "u";
        continue;
      }
      _features[i]["id"] = letters[i];
      if (
        _features[i].special.truth &&
        _features[i - 1].feature === _features[i].feature
      ) {
        _features[i]["id"] = letters[i - 1].toUpperCase();
        continue;
      }
      if (_features[i].special.truth) {
        _features[i]["id"] = _features[i]["id"].toUpperCase();
        continue;
      }
    }

    fs.writeFileSync("src/data/json/item.json", JSON.stringify(data));
    res.status(201).send(resp(true, "Added type"));
  } catch (err) {
    res.status(500).send(resp(false, err));
  }
});

module.exports = router;
