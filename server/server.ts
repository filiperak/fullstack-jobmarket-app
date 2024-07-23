import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect'
import JobsRouter from './routes/jobs'
import cors from 'cors'
import UserRouter from './routes/users'

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000

app.use('/api/v1/jobs',JobsRouter)
app.use('/api/v1/users',UserRouter)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string)
    app.listen(port,() => {
      console.log(`server is running on ${port}`);
    })
  } catch (error) {
    console.log(error); 
  }
}
start();

