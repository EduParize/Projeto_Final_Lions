import express from "express";
import userRoutes from "./routes/user.routes.js";
import playerRoutes from "./routes/player.routes.js"
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api", userRoutes);
app.use("/api", playerRoutes);
app.use(errorMiddleware);
export default app;
