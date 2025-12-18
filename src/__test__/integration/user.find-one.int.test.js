import userModel from "../../models/user.model";
import userRepository from "../../repositories/user.repository";

describe("When we try to find a user with a specific email", () => {
  it("successfully find a user with a email", async () => {
    const userData = {
      name: "find one by email test",
      email: "emailtest@email.com",
      password: "strongpassword123",
    };
    const createUser = await userModel.create(userData);
    const tryFindUser = await userRepository.findByEmail(createUser.email);

    await expect(tryFindUser).toBeDefined();
  });
});
