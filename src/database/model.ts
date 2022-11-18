import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  emailAdress: {
    type: String,
    required: true,
    unique: true,
  },
  identityNumber: {
    type: Number,
    required: true,
    unique: true,
  },
})

const User = mongoose.model("user", schema);

export default User;