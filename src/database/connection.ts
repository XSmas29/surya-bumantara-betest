import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI || "mongodb+srv://admin:admin123@xsmas29.ihmno4p.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
  const DB = await mongoose.connect(URI, {dbName: "db_surya_bumantara_betest"}).then(result => {
    console.log("Database Connected");
  })
  .catch(err => {
    console.log(err);
  })
}

export default connectDB