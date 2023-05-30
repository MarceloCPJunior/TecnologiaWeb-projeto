import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

let UserModel;

try {
  UserModel = mongoose.model('User');
} catch {
  UserModel = mongoose.model('User', UserSchema);
}


export default UserModel