'use server';

import * as jose from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET ?? 'mini-project-nextjs-express';
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jose.jwtVerify(session, encodedKey);

    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}

export async function login(session: string) {
  // Save the session in a cookie
  cookies().set('session', session);
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '');
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export const getToken = () => {
  return cookies().get('session')?.value;
};

export async function isTokenExpired() {
  try {
    const session = cookies().get('session')?.value;

    if (session) {
      const { payload } = await jose.jwtVerify(session, encodedKey);

      if (payload.exp) {
        if (payload.exp < Date.now() / 1000) {
          // Token is expired
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    // Token is invalid or couldn't be decoded
    return true;
  }
}
