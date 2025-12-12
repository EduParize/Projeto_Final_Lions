import { Router } from "express";
import playerController from "../controllers/player.controller.js";

const router = Router();

router.post("/players", playerController.create);
router.get("/players", playerController.list);
// router.get("/users/:id", ensureValidId, userController.get);
// router.put("/users/:id", ensureValidId, userController.update);
// router.delete("/users/:id", ensureValidId, userController.remove);

export default router;
