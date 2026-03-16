import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';

const processGalleryStep = createStep({
  id: 'process-gallery',
  description: 'Process gallery and generate content',
  inputSchema: z.object({
    galleryId: z.string(),
  }),
  outputSchema: z.object({
    galleryId: z.string(),
    status: z.string(),
  }),
  execute: async ({ inputData }) => {
    console.log(`Processing gallery: ${inputData.galleryId}`);
    return { galleryId: inputData.galleryId, status: 'processing' };
  },
});

export const contentFactoryWorkflow = createWorkflow({
  id: 'content-factory',
  description: 'Autonomous content factory for gallery processing',
  inputSchema: z.object({
    galleryId: z.string().uuid(),
  }),
  outputSchema: z.object({
    galleryId: z.string(),
    status: z.string(),
  }),
})
  .then(processGalleryStep)
  .commit();
