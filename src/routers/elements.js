const express = require("express");
const router = express.Router();
const resp = require("../helper/response.js");
const fs = require("fs");

router.get("/elements", async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("src/data/json/elements.json"));
    res.status(200).send(resp(true, data));
  } catch (err) {
    res.status(500).send(resp(false, err));
  }
});

router.put("/add/element", async (req, res) => {
  const { element } = req.body;
  try {
    if (element === undefined || element === null) 
      return res.status(400).send(resp(false, "Missing parameter element."));
    if (typeof element !== 'string')
      return res
        .status(400)
        .send(resp(false, "Element parameter must be of type string"));
    
    const data = JSON.parse(fs.readFileSync("src/data/json/elements.json"))
    data.push(element.toLowerCase());
    fs.writeFileSync("src/data/json/elements.json", JSON.stringify(data))
    res.status(201).send(resp(true, 'Successfully created element'))
  } catch (err) {
    res.status(500).send(resp(false, err));
  }
})

module.exports = router;
