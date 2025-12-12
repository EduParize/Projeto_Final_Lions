import playerRepository from "../repositories/player.repository.js";
import createError from "../utils/app-error.js";

function ensureValidPayloadToPlayers({ namePlayer, positionPlayer }) {
  if (!namePlayer?.trim())
    throw createError("Nome do jogador é obrigatório.", 400);
  if (!positionPlayer?.trim())
    throw createError("Posição do jogador é obrigatória.", 400);
}

export default {
  async createPlayer(data) {
    ensureValidPayloadToPlayers(data);
    const existing = await playerRepository.findByName(data.namePlayer);
    if (existing) {
      throw createError("Jogador já cadastrado", 409);
    }
    return playerRepository.create({
      namePlayer: data.namePlayer.trim(),
      positionPlayer: data.positionPlayer.trim(),
    });
  },
  async listPlayers() {
    return playerRepository.findAll();
  },
  async getPlayer(namePlayer) {
    const player = await playerRepository.findByName(namePlayer);
    if (!player) {
      throw createError("Jogador não encontrado.", 404);
    }
    return player;
  },
  async removePlayer(id) {
    const deleted = await playerRepository.deleteById(id);
    if (!deleted) {
      throw createError("Jogador não encontrado.", 404);
    }
  },
  async updatePlayer(id, data) {
    const payload = {};
    if (data.namePlayer) payload.namePlayer = data.namePlayer;
    if (data.position) payload.positionPlayer = data.position;

    if (Object.keys(payload).length === 0) {
      throw createError("Nenhum campo informado para atualização.", 400);
    }

    const updated = await playerRepository.updateById(id, payload);
    if (!updated) {
      throw createError("Jogador não encontrado.", 404);
    }
    return updated;
  },
};
