import mongoose from "mongoose";

const URI = process.env.MONGO_URI || "mongodb+srv://admin:admin123@xsmas29.ihmno4p.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
  try {
    const DB = await mongoose.connect(URI)
    console.log("Database connected", DB.connection.host);
  } catch (error) {
    console.log(error);
  }
}

export default connectDB