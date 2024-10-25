import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: [0, 1, 2], default: 0, index: true },
    photo: { type: String, default: "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png" },
});

const User = model(collection, schema);
export default User;
