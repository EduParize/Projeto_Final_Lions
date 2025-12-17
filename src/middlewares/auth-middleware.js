import jwt from 'jsonwebtoken';
import createError from '../utils/app-error.js';

export function authMiddleware() {
  return (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw createError('Token não informado.', 401);
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw createError('JWT_SECRET não configurado.', 500);
    }

    try {
      req.user = jwt.verify(token, secret);
      next();
    } catch (error) {
      throw createError('Token inválido ou expirado.', 401);
    }
  };
}

export function requireRole(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user) {
      throw createError('Usuário não autenticado.', 401);
    }

    if (allowedRoles.length === 0) {
      next();
      return;
    }

    const userRole = req.user.role; 
    const userRolesArray = Array.isArray(userRole) ? userRole : [userRole];
    const hasPermission = allowedRoles.some((role) => userRolesArray.includes(role));

    if (!hasPermission) {
      throw createError('Acesso negado.', 403);
    }

    next();
  };
}