import userModel from "../../models/user.model";
import userRepository from "../../repositories/user.repository";


describe("when we try to find a user by a valid id", () => {
  it("should delete the correct user", async () => {
    const user = {
      name: "Find by id name",
      email: "findbyidanddelete@email.com",
      password: "passwordlegalbacana123",
    };
    const createUser = await userModel.create(user);

    const deleteUser = await userRepository.deleteById(createUser._id);

    const findUser = await userModel.findById(createUser._id);

    expect(findUser).toBeNull();
  });
});