const mongoose = require('mongoose')

const connectDB = async (url:string) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db");
  } catch (err) {
    console.error("not connected to db", err);
  }
};

export default connectDB