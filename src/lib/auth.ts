// src/lib/auth.ts
// This file provides a utility function to retrieve the JWT secret key.

export function getJwtSecretKey(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error('The environment variable JWT_SECRET is not set.');
  }

  return secret;
}