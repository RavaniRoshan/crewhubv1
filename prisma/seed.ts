import { PrismaClient, SubscriptionTier, ProjectStatus, WorkflowStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      name: 'Demo User',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      subscriptionTier: SubscriptionTier.PRO,
    },
  });

  // Create a test project
  const project = await prisma.project.create({
    data: {
      userId: user.id,
      name: 'Customer Support Bot',
      description: 'AI-powered customer support automation',
      status: ProjectStatus.ACTIVE,
    },
  });

  // Create a test workflow
  const workflow = await prisma.workflow.create({
    data: {
      projectId: project.id,
      name: 'Support Ticket Triage',
      description: 'Automatically categorize and route support tickets',
      status: WorkflowStatus.ACTIVE,
      configJson: {
        steps: [
          {
            type: 'analyze',
            model: 'gpt-4',
            prompt: 'Analyze the support ticket and categorize its priority and department.',
          },
          {
            type: 'route',
            rules: {
              high_priority: 'urgent_queue',
              medium_priority: 'standard_queue',
              low_priority: 'batch_queue',
            },
          },
        ],
      },
    },
  });

  // Create some test executions
  await prisma.execution.create({
    data: {
      workflowId: workflow.id,
      status: 'COMPLETED',
      inputData: {
        ticket_id: 'T-123',
        content: 'Unable to access my account after password reset',
      },
      outputData: {
        category: 'account_access',
        priority: 'high',
        department: 'security',
      },
      costUsd: 0.02,
      tokenUsage: 150,
      startedAt: new Date(Date.now() - 3600000),
      completedAt: new Date(),
    },
  });

  // Create test API keys
  await prisma.apiKey.create({
    data: {
      userId: user.id,
      provider: 'OPENAI',
      encryptedKey: 'encrypted_key_placeholder',
      isActive: true,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });