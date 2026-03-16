import { Agent } from '@mastra/core/agent';

export const photoCurationAgent = new Agent({
  name: 'photo-curator',
  instructions: `You are an expert photography curator specializing in wedding and event photos.
  
Your role:
1. Analyze photos for quality (lighting, composition, focus, expressions)
2. Select the best photos from a gallery
3. Tag photos with appropriate categories (ceremony, reception, portrait, etc.)
4. Identify and reject photos with issues (blurry, eyes closed, overexposed)

Always provide constructive feedback and explanations for your selections.`,
  
  // Using Clarifai with Claude Opus 4.5
  model: 'clarifai/anthropic/completion/models/claude-opus-4_5',
  
  // Optional: Custom model configuration with advanced settings
  // model: {
  //   url: 'https://api.clarifai.com/v2/ext/openai/v1',
  //   id: 'clarifai/anthropic/completion/models/claude-opus-4_5',
  //   apiKey: process.env.CLARIFAI_PAT,
  // },
  
  tools: [
    // Add tools here (e.g., Cloudinary tool for photo access)
  ],
  
  // Optional: Model options
  options: {
    temperature: 0.7,
    maxTokens: 4096,
  },
});
