import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLenght: 3,
    maxLenght: 200,
  },
  password: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 200,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const Users = mongoose.model("Users", userSchema);
export default Users;
