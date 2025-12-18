import fs from "fs";
import path from "path";

export default async function globalTeardown() {
  if (global.__MONGOINSTANCE__) {
    await global.__MONGOINSTANCE__.stop();
  }

  const file = path.resolve("jest/mongo-uri.json");
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}
