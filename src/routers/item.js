const express = require("express");
const router = express.Router();
const Item = require("../models/item.js");
const resp = require("../helper/response.js");
const { ItemId } = require("../helper/algorithm");

//* Adding a item
router.post("/add/item", async (req, res) => {
  const { name, description, type, feature, value, atk, def, spd, url } = req.body;
  try {
    const id = ItemId(type, feature.feature, feature.duo, await Item.find({}));
    console.log(id)
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
        spd
      }
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
      res.status(500).send(resp(false, "There is a problem with the database"));

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
    if (!item)
      res.status(500).send(resp(false, "Could not find item"));

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

module.exports = router;
