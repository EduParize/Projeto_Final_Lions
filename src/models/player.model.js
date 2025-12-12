import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  namePlayer: { type: String, required: true, trim: true },
  positionPlayer: {
    type: String,
    required: true,
    trim: true,
    enum: ["Goleiro", "Defensor", "Meio Campo", "Atacante"],
  },
});

export default mongoose.model("Player", playerSchema);
