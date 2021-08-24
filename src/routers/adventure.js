const express = require("express");
const router = express.Router();
const Adventure = require("../models/adventure.js");
const resp = require("../helper/response.js");
const { AdventureId } = require("../helper/algorithm");

//* Adding a adventure
router.post("/add/adventure", async (req, res) => {
  const { name, description, level, time, money, xp, url } = req.body;
  try {
    const adventure = new Adventure({
      name,
      id: AdventureId(level, await Adventure.find({})),
      description,
      requirements: {
        level: parseInt(level),
        time: parseInt(time),
        atk: (parseInt(level) ** 2 * 100) / 1000,
        def: (parseInt(level) ** 2 * 100) / 1000,
      },
      reward: {
        money: parseInt(money),
        xp: parseInt(xp),
      },
      url,
      events: [],
    });
    await adventure.save();
    res.status(201).send(resp(true, 'Successfully created adventure'));
  } catch (e) {
    res.status(500).send(resp(false, e));
  }
});

//* Getting all the adventures
router.get('/adventures', async (req, res) => {
  try {
    const adventures = await Adventure.find({});
    if (!adventures) 
      res.status(500).send(resp(false, "There is a problem with the database"));

    res.status(200).send(resp(true, adventures));
  } catch (err) {
    res.status(500).send(resp(false, err));
  }
});

//* Getting a particular adventure
router.get("/adventure/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const adventure = await Adventure.findOne({id});
    if (!adventure) 
      res.status(500).send(resp(false, "Could not find adventure"));

    res.status(200).send(resp(true, adventure));
  } catch (err) {
    res.status(500).send(resp(false, err));
  }
});

//* Deleting a adventure
router.delete("/delete/adventure/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Adventure.deleteOne({id});
    res.status(200).send(resp(true, 'Deleted adventure'))
  } catch (e) {
    res.status(500).send(resp(false, e))
  }
})

module.exports = router;
