import userModel from "../../models/user.model";
import userRepository from "../../repositories/user.repository";

describe("when we try to find a user by a valid id", () => {
  it("should update the correct user", async () => {
    const user = {
      name: "find by ID name",
      email: "findbyidemail@email.com",
      password: "passwordforte123",
    };
    const updatedUser = {
      name: "find by ID name updated",
      email: "findbyidemail@email.com",
      password: "passwordforte123",
    };
    const createUser = await userModel.create(user);
    const updateUser = await userRepository.updateById(
      createUser._id,
      updatedUser
    );

    expect(updatedUser.name).toBe(updateUser.name);
    expect(updatedUser.email).toBe(updateUser.email);
    expect(updatedUser.password).toBe(updateUser.password);

    const newVerification = await userModel.findById(updateUser._id);

    expect(newVerification.name).toBe(updateUser.name);
    expect(newVerification.email).toBe(updateUser.email);
    expect(newVerification.password).toBe(updateUser.password);
  });
});
