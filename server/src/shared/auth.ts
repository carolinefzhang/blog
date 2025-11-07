import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

const SECRET_KEY = 'my_secret_key';

export interface AuthPayload {
  id: string;
  username: string;
  roles: string[];
}

export const generateToken = (payload: AuthPayload): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): AuthPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as AuthPayload;
    } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
};

export const isAuthenticated = (user: AuthPayload): void => {
  if (!user) {
    throw new GraphQLError('Authentication required', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
};

export const isAuthorized = (user: AuthPayload, allowedRoles: string[]): void => {
  if (!user.roles || !allowedRoles.some(role => user.roles.includes(role))) {
    throw new GraphQLError('Forbidden', {
      extensions: { code: 'FORBIDDEN' },
    });
  }
};