// src/__test__/testUtils.js
import fs from 'fs';
import path from 'path';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseDatabase } from '../../jest/setup-db.js';
import { app } from './configApp.js';

export async function bootstrapTest() {
  let dbUri;
  let mongoServer;

  const uriPath = path.resolve('jest/mongo-uri.json');

  // Tenta ler a URI gerada pelo Global Setup
  if (fs.existsSync(uriPath)) {
    const config = JSON.parse(fs.readFileSync(uriPath, 'utf-8'));
    dbUri = config.uri;
  } else {
    // Fallback: Se não achar o arquivo, cria um servidor novo (comportamento antigo)
    mongoServer = await MongoMemoryServer.create();
    dbUri = mongoServer.getUri();
  }

  const DB_NAME = `integration-tests-${Date.now()}`;
  const dbInstance = new MongooseDatabase(dbUri, DB_NAME);

  await dbInstance.start();

  return {
    dbInstance,
    app,
    mongoServer, // Se usou o global, isso será undefined (o que é bom, pois não queremos parar o banco global)
  };
}