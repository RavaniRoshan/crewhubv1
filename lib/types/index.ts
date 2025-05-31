// Add APIKey interface based on the structure used in API routes
export interface APIKey {
  id: string;
  userId: string;
  provider: string; // TODO: Use a specific enum if needed
  encryptedKey: string; // This should probably not be exposed directly in the app type
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  subscriptionTier: 'FREE' | 'PRO' | 'ENTERPRISE';
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  type: 'INTERNAL' | 'CLIENT' | 'DEMO' | 'OTHER';
  status: 'ACTIVE' | 'ARCHIVED' | 'DELETED';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isDeleted: boolean;
  deletedBy?: string;
}

export interface Conversation {
  id: string;
  title: string;
  projectId: string;
  model: string;
  userId: string;
  status: 'active' | 'archived';
  messageCount: number;
  tokenCount: number;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tokenCount?: number;
  userId: string;
  createdAt: Date;
}

export interface APIUsage {
  id: string;
  userId: string;
  projectId?: string;
  conversationId?: string;
  model: string;
  provider: 'openai' | 'anthropic';
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number;
  createdAt: Date;
}

export interface TeamMember {
  id: string;
  userId: string;
  projectId: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

// NextAuth session and user types
export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AppSession {
  user: AppUser;
  expires: string;
}

export interface ProjectVersion {
  id: string;
  projectId: string;
  data: any;
  createdAt: Date;
  createdBy: string;
}

export interface ProjectActivityLog {
  id: string;
  projectId: string;
  action: string;
  data?: any;
  createdAt: Date;
  createdBy: string;
}

// interfaces already defined and exported individually