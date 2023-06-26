import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    perfilImageLink: { type: String, required: false },
    favoritos: [{ type: String }],
});

let UserModel;

try {
  UserModel = mongoose.model('User');
} catch {
  UserModel = mongoose.model('User', UserSchema);
}


export default UserModel