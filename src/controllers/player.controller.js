import playerService from "../services/player.service.js";

export default {
  async create(req, res, next) {
    try {
      const player = await playerService.createPlayer(req.body);
      let playerObject;
      if (typeof player.toObject === "function") {
        playerObject = player.toObject();
      } else {
        playerObject = player;
      }
      res.status(201).json(player);
    } catch (error) {
      next(error);
    }
  },
  async list(req, res, next) {
    try {
      const player = await playerService.listPlayers();
      res.json(player);
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const player = await playerService.getPlayer(req.params.namePlayer);
      res.json(player);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const player = await playerService.updatePlayer(req.params.id, req.body);
      res.json(player);
    } catch (error) {
      next(error);
    }
  },
  async remove(req, res, next) {
    try {
      const player = await playerService.removePlayer(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};
