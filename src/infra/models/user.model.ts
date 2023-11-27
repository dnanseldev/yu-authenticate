import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  complement: String,
  username: String,
  user_organization: String,
  email: String,
  password: String,
  created_at: Date,
});

const UserModel = model("user", userSchema);

export default UserModel;
