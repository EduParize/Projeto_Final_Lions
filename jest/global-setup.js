// jest/global-setup.js
import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';
import path from 'path';

export default async function globalSetup() {
  // Inicia o servidor do banco na memória
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  
  // Salva a instância numa variável global para podermos parar depois
  global.__MONGOINSTANCE__ = instance;

  // Escreve a URI num arquivo JSON para que os testes consigam ler
  // O caminho é relativo à raiz do projeto
  fs.writeFileSync(path.resolve('jest/mongo-uri.json'), JSON.stringify({ uri }));
}