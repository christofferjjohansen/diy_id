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
  const { name, instructions, subjects, categories } = req.body
  
  try {
    const resp = await db.query(`
      insert into games
        (name, instructions, subjects, categories, submissions_start_at, submissions_end_at)
      values 
        (:name, :instructions, ARRAY[:subjects], ARRAY[:categories], now(), now() + INTERVAL '24 hours')
      returning *;
    `, {
      replacements: { name, instructions, subjects, categories }
    })
    
    res.send(resp)
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
});

module.exports = router;