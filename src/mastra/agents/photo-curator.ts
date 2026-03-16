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
  // Model format: Full Clarifai URL with version for specific model version
  model: 'clarifai/anthropic/completion/models/claude-opus-4_5',
  
  // Alternative: Use specific version (uncomment if you want to pin to exact version)
  // model: 'https://clarifai.com/anthropic/completion/models/claude-opus-4_5/versions/ee363bb3e6d3485ab0034bc454b41c52',
  
  tools: [
    // Add tools here (e.g., Cloudinary tool for photo access)
  ],
  
  // Model options
  options: {
    temperature: 0.7,
    maxTokens: 4096,
  },
});
