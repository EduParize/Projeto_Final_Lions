import express from "express";
import userRoutes from "./routes/user.routes.js";
import playerRoutes from "./routes/player.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api", userRoutes);
app.use("/api", playerRoutes);

app.get("*", (req, res) => {
  if (req.url.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "../frontend/login.html")); // Ou index.html, dependendo da lógica
});
app.use(errorMiddleware);
export default app;
