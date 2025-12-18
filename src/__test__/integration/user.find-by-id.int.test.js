import userModel from "../../models/user.model.js";
import userRepository from "../../repositories/user.repository.js";

describe("when we try to find a user by a valid id", () => {
  it("should returns the correct user", async () => {
    const userData = {
      name: "Find By ID User",
      email: `findbyid-${Date.now()}@example.com`,
      password: "strongpasswordforfindbyid123",
    };

    const createdUser = await userModel.create(userData);

    const foundUser = await userRepository.findById(createdUser._id);

    expect(foundUser).toBeDefined();

    expect(foundUser._id.toString()).toBe(createdUser._id.toString());
    expect(foundUser.email).toBe(userData.email.toLowerCase());
  });

  it("should return null when user doesnt exist", async () => {
    const fakeID = "laelex10000";
    const findUser = await userRepository.findById(fakeID._id);

    expect(findUser).toBeNull();
  });
});
