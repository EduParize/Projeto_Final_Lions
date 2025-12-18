import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  role: { type: [String], enum: ["ADMIN", "USER"], default: "USER" },
  myTeam: [{
    _id: false, // Não precisa de ID para essa sub-relação
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    slot: { type: Number, required: true }
  }]
});

export default mongoose.model("User", userSchema);
