const express = require("express");
const router = express.Router();
const resp = require("../helper/response.js");
const fs = require("fs");

router.get("/complains", async (req, res) => {
  const data = JSON.parse(fs.readFileSync("src/data/json/complains.json"))
  res.status(200).send(resp(true, data));
})

module.exports = router;