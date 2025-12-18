import userModel from "../../models/user.model";
import userRepository from "../../repositories/user.repository";

describe("when we try to find a user by a valid id", () => {
  it("should update the correct user", async () => {
    const user = {
      name: "find by ID name",
      email: "email.original@email.com",
      password: "passwordforte123",
    };
    const createUser = await userModel.create(user);

    expect(createUser).toBeDefined();
    expect(createUser._id).toBeDefined();

    const updatedUserPayload = {
      name: "find by ID name updated",
      email: "email.updated@email.com",
      password: "passwordforte123",
    };

    const updateUser = await userRepository.updateById(
      createUser._id,
      updatedUserPayload
    );

    expect(updateUser).not.toBeNull();

    expect(updateUser.name).toBe(updatedUserPayload.name);
    expect(updateUser.email).toBe(updatedUserPayload.email);

    expect(updateUser.password).toBe(updatedUserPayload.password);

    const newVerification = await userModel.findById(updateUser._id);
    expect(newVerification.name).toBe(updatedUserPayload.name);
  });
});
