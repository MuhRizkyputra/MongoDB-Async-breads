var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();

module.exports = function (db) {
    const Todo = db.collection('todos')
    const User = db.collection('users')


    router.get('/', async function (req, res, next) {

        try {
          const data = await Todo.find().toArray()
          res.status(200).json({ data })
        } catch {
          res.status(500).json(err)
        }
      })
    

    router.get('/:id', async function (req, res) {
        try {
            const id = req.params.id
            const todo = await Todo.findOne({ _id: new ObjectId(id) })
            res.status(201).json(todo)

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

    router.post('/', async function (req, res) {
        try {
            const { title, executor } = req.body
            const user = await User.findOne({ _id: new ObjectId(executor) })
            const date = new Date(Date.now() + 24 * 60 * 60 * 1000)
            const todo = await Todo.insertOne({ title: title, complete: false, deadline: date, executor: user._id })
            const data = await Todo.find({ _id: new ObjectId(todo.insertedId) }).toArray()
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

    router.put('/:id', async function (req, res) {
        try {
          
          const id = req.params.id
          const { title, deadline, complete } = req.body
          const todo = await Todo.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { title: title , deadline: new Date(deadline) , complete: JSON.parse(complete) } }, { returnDocument: 'after'});
          res.status(201).json(todo)
        } catch (error) {
          res.status(500).json({ error: error.message })
        }
      })

    router.delete('/:id', async function (req, res) {
        try {
            const id = req.params.id
            const todo = await Todo.findOneAndDelete({ _id: new ObjectId(id) })
            res.json(todo)

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

    return router;
}