import { MongoMemoryServer } from "mongodb-memory-server";
import fs from "fs";
import path from "path";

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();

  global.__MONGOINSTANCE__ = instance;

  fs.writeFileSync(
    path.resolve("jest/mongo-uri.json"),
    JSON.stringify({ uri })
  );
}
