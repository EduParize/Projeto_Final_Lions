import dotenv from "dotenv";
import app from "./app.js";
import connect from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT;

(async () => {
  try {
    await connect(process.env.MONGODB_URI);
    app.listen(PORT, () =>
      console.log(`API ouvindo em http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Erro ao conectar no banco ou inciar o servidor", error);
    process.exit(1);
  }
})();
