const express = require("express");
const router = express.Router();
const resp = require("../helper/response.js");
const fs = require("fs");
const addClass = require("../data/scripts/classes");

router.get("/classes", async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("src/data/json/classes.json"));
    res.status(200).send(resp(true, data));
  } catch (err) {
    res.status(500).send(resp(false, err));
  }
});

router.put("/add/class", async (req, res) => {
  const { name, info, thumbnail, img } = req.body;
  try {
    if (name === undefined || name === null)
      return res.status(400).send(resp(false, "Missing parameter name."));
    if (info === undefined || info === null)
      return res.status(400).send(resp(false, "Missing parameter name."));
    if (thumbnail === undefined || thumbnail === null)
      return res.status(400).send(resp(false, "Missing parameter name."));
    if (img === undefined || img === null)
      return res.status(400).send(resp(false, "Missing parameter name."));

    if (
      typeof name !== "string" ||
      typeof info !== "string" ||
      typeof thumbnail !== "string" ||
      typeof img !== "string"
    )
      return res
        .status(400)
        .send(resp(false, "Parameters of class must be of type string"));

    addClass(name, info, thumbnail, img);
    res.status(201).send(resp(true, "Created class"));
  } catch (e) {
    res.status(500).send(resp(false, e));
  }
});

module.exports = router;
