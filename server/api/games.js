const db = require('../db/index')
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const resp = await db.query(`select * from games;`, {})
    res.send(resp)
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
});

router.get("/:id", async (req, res) => {
  try {
    const resp = await db.one(`
      select * from games where id = :id;
    `, { replacements: { id : req.params.id }})
    res.send(resp)
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
});

router.post("/", async (req, res) => {
  const { name, instructions, categories, numberOfPhotos, } = req.body
  
  try {
    const resp = await db.query(`
      insert into games
        (name, instructions, categories, number_of_photos)
      values 
        (:name, :instructions, ARRAY[:categories], :numberOfPhotos)
      returning *;
    `, {
      replacements: { name, instructions, categories, numberOfPhotos }
    })
    
    res.send(resp)
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
});

module.exports = router;