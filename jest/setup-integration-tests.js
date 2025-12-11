

import { bootstrapTest } from '../src/__test__/testUtils.js';
import UserModel from '../src/models/user.model.js';

let dbInstance;
let mongoServer;

beforeAll(async () => {
  const bootstrap = await bootstrapTest();
  dbInstance = bootstrap.dbInstance;
  mongoServer = bootstrap.mongoServer;
  global.app = bootstrap.app;
});

afterEach(async () => {
  await UserModel?.deleteMany({});
});

afterAll(async () => {
  await dbInstance?.close();
  await mongoServer?.stop();
});