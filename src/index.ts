import "dotenv/config";
import express, { Router } from "express";
import path from "path";
import morgan from "morgan";
import connectDB from "./database/connection";
import userRouter from "./routes/user";

const app = express()
app.use(express.json())

connectDB()

const PORT = process.env.PORT || 3030
app.use('/api/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})