import Player from "../models/player.model.js";

export default {
  create(data) {
    return Player.create(data);
  },
  findAll() {
    return Player.find();
  },
  findByName(namePlayer) {
    return Player.findOne({ namePlayer });
  },
  updateById(id, data) {
    return Player.findByIdAndUpdate(id, data, { new: true });
  },
  deleteById(id) {
    return Player.findByIdAndDelete(id);
  },
};
