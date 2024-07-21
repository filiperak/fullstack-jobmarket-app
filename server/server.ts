import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect'

const app = express()
dotenv.config()

app.use(express.json())
const port = process.env.PORT || 5000

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