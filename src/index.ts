import "dotenv/config";
import express from "express";
import connectDB from "./database/connection";
import userRouter from "./routes/user";
import { authenticateToken, createToken } from "./auth";
const app = express()
app.use(express.json())

connectDB()

const PORT = process.env.PORT || 3030
app.use('/api/user', authenticateToken, userRouter)

app.get('/token', (req, res) => {
  const token = createToken({id: Math.random()})
  res.json({status: 'ok', token: token})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})