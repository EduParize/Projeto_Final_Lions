import userService from "../services/user.service.js";

export default {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    try {
      const user = await userService.createUser(req.body);

      let userObject;

      if (typeof user.toObject === "function") {
        userObject = user.toObject();
      } else {
        userObject = user;
      }

      const { password, ...userWithoutPassword } = userObject;

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  },

  async list(req, res, next) {
    try {
      const users = await userService.listUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const user = await userService.getUser(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  async remove(req, res, next) {
    try {
      const user = await userService.removeUser(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};
