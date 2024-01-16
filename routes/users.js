var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();


module.exports = function (db){
const User = db.collection('users')


router.get('/', async function (req, res , next){
 
  try {
    const data = await User.find().toArray()
    console.log('test', data)
  res.status(200).json({user : data});
  } catch {
    res.status(500).json(err)
  }
})


router.get('/:id', async function (req, res) {
  try {
    const id = req.params.id
    const user = await User.findOne({_id: new ObjectId(id) })
    res.status(201).json(user)

  }catch (error) {
    res.status(500).json(error)
  }
})

router.post('/', async function (req, res) {
  try {
    const {name , phone} = req.body
    const user = await User.insertOne({ name , phone })
    const data = await User.findOne({ _id : new ObjectId(user.insertedId)})
    res.status(200).json(data)

  }catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', async function (req, res) {
  try {
    const id = req.params.id
    const user = await User.findOneAndDelete({ _id: new ObjectId(id)})
  res.json(user)

  }catch (error) {
    res.status(500).json({ error: error.message })
  }
})
return router
}