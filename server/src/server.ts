import express from "express";
import cors from "cors";
import mongoose from "mongoose";

//database
const MONGO_URL = 'mongodb+srv://filiperak:filiperak@e-commerce.xggmbpa.mongodb.net/?retryWrites=true&w=majority&appName=e-commerce'
mongoose.connect(MONGO_URL)
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const app = express();
app.use(express.json());
app.use(cors());
app.listen(4000, () => {
  console.log("app is running");
});
