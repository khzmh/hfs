import { Mastra } from '@mastra/core';

// Import agents
import { photoCurationAgent } from './agents/photo-curator';

// Import workflows
import { contentFactoryWorkflow } from './workflows/content-factory';

export const mastra = new Mastra({
  // Register agents here
  agents: [
    photoCurationAgent,
  ],
  
  // Register workflows here
  workflows: [
    contentFactoryWorkflow,
  ],
  
  // Storage configuration (uses your Neon database)
  storage: {
    type: 'postgresql',
    url: process.env.DATABASE_URL!,
  },
  
  // Logger configuration - fix for runtime error
  logger: false, // Disable logger to prevent runtime error
});

export type { Mastra };
