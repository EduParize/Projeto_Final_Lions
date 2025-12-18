import repo from "../repositories/user.repository.js";
import createError from "../utils/app-error.js";
import hashPassword, { compareHashedPassword } from "../utils/hash-password.js";
import jwt from "jsonwebtoken";

function ensureValidPayload({ name, email, password }) {
  if (!name?.trim()) throw createError("Nome é obrigatorio.", 400);
  if (!email?.trim()) throw createError("E-mail é obrigatorio.", 400);
  if (!email.includes("@")) throw createError("E-mail invalido.", 400);
  if (!password) throw createError("Senha é obrigatorio.", 400);
}

export default {
  async createUser(data) {
    ensureValidPayload(data);
    const existing = await repo.findByEmail(data.email);
    if (existing) {
      throw createError("E-mail já cadastrado.", 409);
    }
    const hashedPassword = hashPassword(data.password);

    return repo.create({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      password: hashedPassword,
      role: data.role || ["USER"],
    });
  },
  async loginUser(email, password) {
    if (!email || !password) {
      throw createError("Email e senha são obrigatorios", 400);
    }

    const user = await repo.findByEmail(email).populate("myTeam.player");

    if (!user) {
      throw createError("Email ou senha invalidos", 401);
    }
    const isMatch = compareHashedPassword(password, user.password);
    if (!isMatch) {
      throw createError("Email ou senha invalidos", 401);
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        myTeam: user.myTeam || [],
      },
    };
  },
  async saveUserTeam(userId, playerIds) {
    const updatedUser = await repo.updateById(userId, { myTeam: playerIds });
    if (!updatedUser) throw createError("Usuário não encontrado", 404);
    
    return updatedUser.populate('myTeam.player');
  },

  async listUsers() {
    return repo.findAll();
  },
  async getUser(id) {
    const user = repo.findById(id);
    if (!user) {
      throw createError("Usuario não encontrado.", 404);
    }
    return user;
  },
  async updateUser(id, data) {
    const payload = { ...data };

    if (payload.email) {
      if (!payload.email.includes("@")) {
        throw createError("E-mail inválido.", 400);
      }
      const existing = await repo.findByEmail(payload.email);
      if (existing && existing.id !== id) {
        throw createError("E-mail já cadastrado.", 409);
      }
      payload.email = payload.email.trim().toLowerCase();
    }
    if (payload.name) {
      payload.name = payload.name.trim();
    }
    if (payload.password) {
      payload.password = hashPassword(payload.password);
    }

    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined) {
        delete payload[key];
      }
    });
    if (Object.keys(payload).length === 0) {
      throw createError("Nenhum campo informado para atualização.", 400);
    }
    const updated = await repo.updateById(id, payload);
    if (!updated) {
      throw createError("Usuario não encontrado.", 404);
    }
    return updated;
  },
  async removeUser(id) {
    const deleted = await repo.deleteById(id);
    if (!deleted) {
      throw createError("Usuario não encontrado.", 404);
    }
  },
};
