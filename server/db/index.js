const db = require('../models/index').sequelize;

const execute = async function(sql, options) {
  await db.query(sql, options)
} 

const one = async function(sql, options) {
  const resp = await db.query(sql, options)

  if (resp[0].length > 1) throw 'More than 1 returned'
  return resp[0][0]
}

const query = async function(sql, options) {
  const resp = await db.query(sql, options)
  return resp[0]
} 

module.exports = {
  execute,
  one,
  query
}