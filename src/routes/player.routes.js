import { Router } from "express";
import playerController from "../controllers/player.controller.js";
import {authMiddleware, requireRole} from "../middlewares/auth-middleware.js"

const router = Router();

router.get("/players", playerController.list);
// router.get("/users/:id", ensureValidId, userController.get);
// router.put("/users/:id", ensureValidId, userController.update);
// router.delete("/users/:id", ensureValidId, userController.remove);
router.post("/players", authMiddleware(), requireRole("ADMIN"), playerController.create);
router.put("/players/:id", authMiddleware(), requireRole("ADMIN"), playerController.update);
router.delete("/players/:id", authMiddleware(), requireRole("ADMIN"), playerController.remove);

export default router;
