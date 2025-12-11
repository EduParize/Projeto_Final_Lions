import userRepository from "../../repositories/user.repository";

describe("When we try to create a new user", () => {
  it("The created user should have an id", async () => {
    const userData = {
      name: "User created",
      email: "userwithID@email.com",
      password: "passwordbacanalegal123",
    };
    const createdUser = await userRepository.create(userData)

    expect(createdUser).toHaveProperty("_id")
    expect(createdUser).toBeDefined()
  });
});
