import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect'
import JobsRouter from './routes/jobs'

const app = express()
app.use(express.json())
dotenv.config()
const port = process.env.PORT || 5000

app.use('/api/v1/jobs',JobsRouter)

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

