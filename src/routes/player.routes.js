import { Router } from "express";
import playerController from "../controllers/player.controller.js";
import { authMiddleware, requireRole } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/players", playerController.list);

router.post(
  "/players",
  authMiddleware(),
  requireRole("ADMIN"),
  playerController.create
);
router.put(
  "/players/:id",
  authMiddleware(),
  requireRole("ADMIN"),
  playerController.update
);
router.delete(
  "/players/:id",
  authMiddleware(),
  requireRole("ADMIN"),
  playerController.remove
);

export default router;
