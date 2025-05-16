import express from "express"
import User from "../models/User.js"
import mongoose from "mongoose"

const router = express.Router()

// CREATE OPERATIONS

// insertOne
router.post("/insertOne", async (req, res) => {
  try {
    const result = await User.collection.insertOne(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// insertMany
router.post("/insertMany", async (req, res) => {
  try {
    const result = await User.collection.insertMany(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// READ OPERATIONS

// find
router.post("/find", async (req, res) => {
  try {
    const { query = {}, limit = 10, skip = 0, sort = { _id: -1 } } = req.body
    const result = await User.collection.find(query).limit(limit).skip(skip).sort(sort).toArray()
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// findOne
router.post("/findOne", async (req, res) => {
  try {
    const { query = {} } = req.body
    const result = await User.collection.findOne(query)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// distinct
router.post("/distinct", async (req, res) => {
  try {
    const { field, query = {} } = req.body
    if (!field) {
      return res.status(400).json({ message: "Field is required" })
    }
    const result = await User.collection.distinct(field, query)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// countDocuments
router.post("/countDocuments", async (req, res) => {
  try {
    const { query = {} } = req.body
    const result = await User.collection.countDocuments(query)
    res.json({ count: result })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// UPDATE OPERATIONS

// updateOne
router.post("/updateOne", async (req, res) => {
  try {
    const { filter, update } = req.body
    const result = await User.collection.updateOne(filter, update)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// updateMany
router.post("/updateMany", async (req, res) => {
  try {
    const { filter, update } = req.body
    const result = await User.collection.updateMany(filter, update)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// replaceOne
router.post("/replaceOne", async (req, res) => {
  try {
    const { filter, replacement } = req.body
    const result = await User.collection.replaceOne(filter, replacement)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// findOneAndUpdate
router.post("/findOneAndUpdate", async (req, res) => {
  try {
    const { filter, update } = req.body
    const result = await User.collection.findOneAndUpdate(filter, update, { returnDocument: "after" })
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// findOneAndReplace
router.post("/findOneAndReplace", async (req, res) => {
  try {
    const { filter, replacement } = req.body
    const result = await User.collection.findOneAndReplace(filter, replacement, { returnDocument: "after" })
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE OPERATIONS

// deleteOne
router.post("/deleteOne", async (req, res) => {
  try {
    const { filter } = req.body
    const result = await User.collection.deleteOne(filter)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// deleteMany
router.post("/deleteMany", async (req, res) => {
  try {
    const { filter } = req.body
    const result = await User.collection.deleteMany(filter)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// findOneAndDelete
router.post("/findOneAndDelete", async (req, res) => {
  try {
    const { filter } = req.body
    const result = await User.collection.findOneAndDelete(filter)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// INDEX OPERATIONS

// createIndex
router.post("/createIndex", async (req, res) => {
  try {
    const { indexSpec, indexOptions = {} } = req.body
    const result = await User.collection.createIndex(indexSpec, indexOptions)
    res.json({ indexName: result })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// dropIndex
router.post("/dropIndex", async (req, res) => {
  try {
    const { indexName } = req.body
    const result = await User.collection.dropIndex(indexName)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// getIndexes
router.post("/getIndexes", async (req, res) => {
  try {
    const result = await User.collection.indexes()
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// COLLECTION OPERATIONS

// aggregate
router.post("/aggregate", async (req, res) => {
  try {
    const { pipeline } = req.body
    const result = await User.collection.aggregate(pipeline).toArray()
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// bulkWrite
router.post("/bulkWrite", async (req, res) => {
  try {
    const { operations } = req.body
    const result = await User.collection.bulkWrite(operations)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// renameCollection
router.post("/renameCollection", async (req, res) => {
  try {
    const { newName } = req.body
    const result = await User.collection.rename(newName)
    res.json({ success: true, message: `Collection renamed to ${newName}` })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// drop
router.post("/drop", async (req, res) => {
  try {
    const result = await User.collection.drop()
    res.json({ success: result, message: "Collection dropped" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// listCollections
router.post("/listCollections", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray()
    res.json(collections)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
