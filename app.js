import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use("/api/users", userRoutes)

// Status route
app.get("/api/status", (req, res) => {
  res.json({ status: "ok", message: "Server is running" })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
  })

export default app