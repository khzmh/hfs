import { Mastra } from '@mastra/core';
import { PostgresStore } from '@mastra/pg';

import { photoCurationAgent } from './agents/photo-curator';

import { contentFactoryWorkflow } from './workflows/content-factory';

export const mastra = new Mastra({
  agents: {
    photoCurationAgent,
  },
  
  workflows: {
    contentFactoryWorkflow,
  },
  
  storage: new PostgresStore({
    id: 'mastra-storage',
    connectionString: process.env.DATABASE_URL!,
  }),
});

export type { Mastra };
