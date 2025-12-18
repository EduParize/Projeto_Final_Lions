import fs from "fs";
import path from "path";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongooseDatabase } from "../../jest/setup-db.js";
import { app } from "./configApp.js";

export async function bootstrapTest() {
  let dbUri;
  let mongoServer;

  const uriPath = path.resolve("jest/mongo-uri.json");

  if (fs.existsSync(uriPath)) {
    const config = JSON.parse(fs.readFileSync(uriPath, "utf-8"));
    dbUri = config.uri;
  } else {
    mongoServer = await MongoMemoryServer.create();
    dbUri = mongoServer.getUri();
  }

  const DB_NAME = `integration-tests-${Date.now()}`;
  const dbInstance = new MongooseDatabase(dbUri, DB_NAME);

  await dbInstance.start();

  return {
    dbInstance,
    app,
    mongoServer,
  };
}
