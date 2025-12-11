// jest/global-teardown.js
import fs from 'fs';
import path from 'path';

export default async function globalTeardown() {
  // Para o servidor do banco se ele existir
  if (global.__MONGOINSTANCE__) {
    await global.__MONGOINSTANCE__.stop();
  }

  // Apaga o arquivo temporário com a URI
  const file = path.resolve('jest/mongo-uri.json');
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}