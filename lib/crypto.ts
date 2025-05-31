import crypto from 'crypto';
import env from './env';

const ALGO = 'aes-256-gcm';
const IV_LENGTH = 12;

function getKey(): Buffer {
  // ENCRYPTION_KEY is a 32-char string, convert to 32-byte Buffer
  return Buffer.from(env.ENCRYPTION_KEY, 'utf-8');
}

export function encrypt(plain: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getKey();
  // @ts-expect-error Node.js Buffer is valid CipherKey
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  let encrypted = cipher.update(plain, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  const tag = cipher.getAuthTag();
  return [iv.toString('base64'), tag.toString('base64'), encrypted].join('.');
}

export function decrypt(enc: string): string {
  const [ivB64, tagB64, data] = enc.split('.');
  const iv = Buffer.from(ivB64, 'base64');
  const tag = Buffer.from(tagB64, 'base64');
  const key = getKey();
  // @ts-expect-error Node.js Buffer is valid CipherKey
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  // @ts-expect-error Node.js Buffer is valid for setAuthTag
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
} 