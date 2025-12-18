import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { ensureValidId } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/login", userController.login);
router.post("/users", userController.create);
router.get("/users", userController.list);
router.put("/users/team", authMiddleware(), userController.saveTeam);
router.get("/users/:id", ensureValidId, userController.get);
router.put("/users/:id", ensureValidId, userController.update);
router.delete("/users/:id", ensureValidId, userController.remove);

export default router;
