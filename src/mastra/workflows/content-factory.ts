import { createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

export const contentFactoryWorkflow = createWorkflow({
  id: 'content-factory',
  description: 'Autonomous content factory for gallery processing',
  inputSchema: z.object({
    galleryId: z.string().uuid(),
  }),
})
  // Step 1: Process gallery
  .then(async ({ galleryId }) => {
    console.log(`Processing gallery: ${galleryId}`);
    return { galleryId, status: 'processing' };
  })
  .commit();
