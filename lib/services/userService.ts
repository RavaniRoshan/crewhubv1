import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/crypto';
import { User as AppUser, Project, APIUsage, APIKey as APIKeyInterface, SubscriptionTier as AppSubscriptionTier } from '@/lib/types';
import { Prisma, SubscriptionTier as PrismaSubscriptionTier, ApiKey as PrismaApiKey, User as PrismaDbUser } from '@prisma/client';

interface UserUpdateData {
  name?: string;
  email?: string;
  avatarUrl?: string;
  subscriptionTier?: AppSubscriptionTier;
}

interface GetUserProjectsOptions {
  page?: number;
  pageSize?: number;
  filter?: { status?: Project['status'] };
  sort?: { field: keyof Project; direction: 'asc' | 'desc' };
}

interface GetUserUsageStatsOptions {
  startDate?: Date;
  endDate?: Date;
}

// Helper to map Prisma User to app User interface (excluding sensitive fields)
const mapPrismaUserToAppUser = (user: PrismaDbUser): AppUser => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hashedPassword, resetToken, resetTokenExpiry, emailVerified, subscriptionTier, ...rest } = user;
  return { ...rest, subscriptionTier: user.subscriptionTier as AppSubscriptionTier };
};

// Helper to map Prisma APIKey to app APIKey interface (after decryption)
const mapPrismaApiKeyToAppApiKey = (apiKey: PrismaApiKey, decryptedKey: string): APIKeyInterface => ({
  id: apiKey.id,
  userId: apiKey.userId,
  provider: apiKey.provider,
  encryptedKey: decryptedKey, // Store the decrypted key here for app use
  isActive: apiKey.isActive,
  createdAt: apiKey.createdAt,
  updatedAt: apiKey.updatedAt,
});

export async function getUserById(userId: string): Promise<AppUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) return null;
    return mapPrismaUserToAppUser(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function getUserByEmail(email: string): Promise<AppUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return mapPrismaUserToAppUser(user);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function createUser(data: Prisma.UserCreateInput): Promise<AppUser> {
  try {
    const user = await prisma.user.create({ data });
    return mapPrismaUserToAppUser(user);
  } catch (error) {
    console.error('Error creating user:', error);
    // TODO: Handle specific errors (e.g., unique constraint)
    throw new Error('Failed to create user');
  }
}

export async function updateUser(userId: string, data: UserUpdateData): Promise<AppUser> {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        subscriptionTier: data.subscriptionTier as PrismaSubscriptionTier,
      },
    });
    return mapPrismaUserToAppUser(user);
  } catch (error) {
    console.error('Error updating user:', error);
    // TODO: Handle specific errors (e.g., user not found)
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(userId: string): Promise<AppUser> {
  try {
    // TODO: Implement soft delete if applicable, otherwise hard delete
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    return mapPrismaUserToAppUser(user);
  } catch (error) {
    console.error('Error deleting user:', error);
    // TODO: Handle specific errors (e.g., user not found)
    throw new Error('Failed to delete user');
  }
}

export async function getUserProjects(userId: string, options: GetUserProjectsOptions = {}): Promise<Project[]> {
  const { page = 1, pageSize = 10, filter, sort } = options;
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const orderBy: any = sort ? { [sort.field]: sort.direction } : { createdAt: 'desc' };

  try {
    const projects = await prisma.project.findMany({
      where: { userId, ...filter },
      skip,
      take,
      orderBy,
      // TODO: Include relations if needed (e.g., workflows, members)
    });
    // Assuming Project types match closely or map here if necessary
    return projects as Project[];
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw new Error('Failed to fetch user projects');
  }
}

// TODO: Define return type for usage stats
export async function getUserUsageStats(userId: string, options: GetUserUsageStatsOptions = {}): Promise<any> {
  const { startDate, endDate } = options;
  try {
    // This is a placeholder query. Real implementation would aggregate APIUsage records.
    const stats = await prisma.aPIUsage.aggregate({
      _sum: {
        totalTokens: true,
        cost: true,
      },
      where: {
        userId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    // TODO: Format stats data
    return stats;
  } catch (error) {
    console.error('Error fetching user usage stats:', error);
    throw new Error('Failed to fetch user usage stats');
  }
}

export async function updateUserSubscription(userId: string, tier: AppSubscriptionTier): Promise<AppUser> {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { subscriptionTier: tier as PrismaSubscriptionTier },
    });
    return mapPrismaUserToAppUser(user);
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw new Error('Failed to update user subscription');
  }
}

export async function getUserAPIKeys(userId: string): Promise<APIKeyInterface[]> {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
    });
    const decryptedKeys = apiKeys.map((key: PrismaApiKey) => {
        const decrypted = decrypt(key.encryptedKey);
        return mapPrismaApiKeyToAppApiKey(key, decrypted);
    });
    return decryptedKeys;
  } catch (error) {
    console.error('Error fetching user API keys:', error);
    throw new Error('Failed to fetch user API keys');
  }
} 