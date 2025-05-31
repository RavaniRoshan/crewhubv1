import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(16),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  OPENAI_API_KEY: z.string(),
  ANTHROPIC_API_KEY: z.string(),
  EMAIL_SERVER_HOST: z.string(),
  EMAIL_SERVER_PORT: z.coerce.number(),
  EMAIL_SERVER_USER: z.string(),
  EMAIL_SERVER_PASSWORD: z.string(),
  EMAIL_FROM: z.string(),
  REDIS_URL: z.string().url(),
  SLACK_API_KEY: z.string().optional(),
  GITHUB_APP_ID: z.string().optional(),
  GITHUB_APP_SECRET: z.string().optional(),
  FEATURE_EMAIL_VERIFICATION: z.coerce.boolean().default(false),
  FEATURE_TEAM_WORKSPACES: z.coerce.boolean().default(false),
  FEATURE_BETA_ACCESS: z.coerce.boolean().default(false),
  ENCRYPTION_KEY: z.string().length(32),
});

function getEnvForEnv(env: string) {
  if (env === 'production') return {
    DATABASE_URL: process.env.DATABASE_URL_PROD,
    REDIS_URL: process.env.REDIS_URL_PROD,
  };
  if (env === 'staging') return {
    DATABASE_URL: process.env.DATABASE_URL_STAGING,
    REDIS_URL: process.env.REDIS_URL_STAGING,
  };
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
  };
}

const runtimeEnv = {
  ...process.env,
  ...getEnvForEnv(process.env.NODE_ENV || 'development'),
};

const env = envSchema.parse(runtimeEnv);

export default env; 