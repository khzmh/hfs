# 🤖 Mastra AI Setup - Hafiportrait Platform

## 📋 Overview

This project uses **Mastra AI** framework for autonomous AI agents and workflows:

- **Photo Curation Agent** - Auto-select best photos from galleries
- **Content Factory Workflow** - Autonomous content production pipeline
- **Code Maintenance Agent** - Autonomous code review and fixes (planned)

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

Required variables:
```env
# Database (already configured)
DATABASE_URL='postgresql://...'

# AI Provider (choose one)
OPENAI_API_KEY=sk-...        # Recommended for GPT-4o
# OR
ANTHROPIC_API_KEY=sk-ant-...  # For Claude models

# Cloudinary (already configured)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 3. Run Mastra Development Server

```bash
# Start Mastra dev server (separate from Next.js)
npm run mastra:dev
```

This will:
- Start Mastra Studio at `http://localhost:4111`
- Enable hot-reload for agent/workflow changes
- Connect to your Neon database

### 4. Test Agents in Studio

Open **Mastra Studio** at `http://localhost:4111` to:
- Test agents interactively
- Run workflows manually
- Monitor agent executions
- View logs and debugging

---

## 📁 Project Structure

```
src/
├── mastra/
│   ├── index.ts                    # Mastra entry point & configuration
│   ├── agents/
│   │   └── photo-curator.ts        # Photo curation agent
│   ├── workflows/
│   │   └── content-factory.ts      # Content production workflow
│   ├── tools/                      # Custom tools for agents
│   └── scorers/                    # Evaluation scorers
│
├── app/
│   └── api/
│       └── ai/                     # AI API endpoints (to be added)
│           ├── content-factory/
│           └── status/
│
└── ...
```

---

## 🤖 Available Agents

### Photo Curator Agent

**Purpose:** Automatically curate the best photos from a gallery

**Capabilities:**
- Analyze photo quality (lighting, composition, focus)
- Detect and reject problematic photos (blurry, eyes closed)
- Tag photos by category (ceremony, reception, portrait)
- Select top N photos based on client preferences

**Usage:**
```typescript
import { mastra } from '@/mastra';

const result = await mastra.agents['photo-curator'].generate({
  messages: [{
    role: 'user',
    content: 'Curate the best 40 photos from gallery_abc123'
  }]
});
```

---

## ⚙️ Workflows

### Content Factory Workflow

**Purpose:** Autonomous end-to-end content production

**Steps:**
1. Fetch gallery photos from database
2. AI curation (parallel processing)
3. AI enhancement (color correction)
4. Generate captions & metadata
5. Save results to database
6. Trigger social media posting (optional)

**Usage:**
```typescript
import { mastra } from '@/mastra';

const result = await mastra.workflows['content-factory'].run({
  galleryId: 'uuid-here'
});
```

---

## 🌐 Deploy to Mastra Cloud

### 1. Push to GitHub

```bash
git add .
git commit -m "Add Mastra AI integration"
git push origin main
```

### 2. Import to Mastra Cloud

1. Go to https://mastra.ai/cloud
2. Click **"Create from GitHub"**
3. Select your repository: `khzmh/hfs`
4. Configure environment variables:
   - `DATABASE_URL` (already in Neon)
   - `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
5. Click **"Create Project"**

### 3. Deploy

1. Enable **Deployment settings** in Mastra Cloud
2. Click **"Deploy"**
3. Wait for deployment to complete
4. Your agents are now live!

---

## 🔧 Development Tips

### Hot Reload

When editing agents/workflows:
- Mastra dev server auto-reloads on file changes
- No need to restart manually

### Testing Agents

**Option 1: Mastra Studio (Recommended)**
```bash
npm run mastra:dev
# Open http://localhost:4111
```

**Option 2: Programmatic Testing**
```typescript
// Create a test file: src/mastra/__tests__/photo-curator.test.ts
import { photoCurationAgent } from '../agents/photo-curator';

test('should curate photos correctly', async () => {
  const result = await photoCurationAgent.generate({
    messages: [{ role: 'user', content: 'Test message' }]
  });
  expect(result).toBeDefined();
});
```

### Debugging

Enable verbose logging:
```typescript
// src/mastra/index.ts
export const mastra = new Mastra({
  // ...
  logger: {
    level: 'debug',  // Change from 'info' to 'debug'
  },
});
```

---

## 📊 Database Schema Extensions

Mastra requires additional tables for agent memory and workflow state:

```bash
# Run migrations
npx prisma migrate dev --name add_mastra_tables
```

This creates:
- `mastra_workflow_state` - Workflow execution state
- `mastra_agent_memory` - Agent conversation memory
- `mastra_evaluations` - Agent performance tracking

---

## 🔒 Security Notes

- **Never commit `.env`** - Already in `.gitignore`
- **API keys** - Store in Mastra Cloud environment variables
- **Database access** - Mastra uses read-only queries by default
- **Rate limiting** - Configure limits in agent options

---

## 📚 Resources

- [Mastra Docs](https://mastra.ai/docs)
- [Mastra Cloud Setup](https://mastra.ai/docs/mastra-cloud/setup)
- [Agent Documentation](https://mastra.ai/docs/agents/overview)
- [Workflow Documentation](https://mastra.ai/docs/workflows/overview)
- [Discord Community](https://discord.gg/mastra)

---

## 🐛 Troubleshooting

### "No Mastra project found"
- Ensure `src/mastra/index.ts` exists
- Run `npm run mastra:dev` to verify setup
- Check that `@mastra/core` is installed

### Database connection errors
- Verify `DATABASE_URL` in `.env`
- Ensure Neon database is accessible
- Check SSL mode is set to `require`

### Agent not responding
- Check API key is valid (OpenAI/Anthropic)
- Verify model name is correct
- Check Mastra Studio logs for errors

---

## 📈 Next Steps

1. ✅ Setup complete - agents ready
2. 🔲 Add Cloudinary tool for photo access
3. 🔲 Implement photo curation logic
4. 🔲 Add API endpoints for workflow triggers
5. 🔲 Deploy to Mastra Cloud
6. 🔲 Monitor and optimize performance
