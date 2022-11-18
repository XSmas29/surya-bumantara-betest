import "dotenv/config";
import express from "express";
import path from "path";
import morgan from "morgan";
import connectDB from "./database/connection";

const app = express()
app.use(express.json())

connectDB()

const PORT = process.env.PORT || 3030

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})