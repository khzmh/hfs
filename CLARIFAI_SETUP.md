# 🔑 Clarifai Environment Setup Guide

## 📋 Environment Variables (.env)

### Required Variables

Add these to your `.env` file:

```env
# Clarifai AI Configuration
CLARIFAI_PAT='fc2eb155461948078288d439fa33b06c'
CLARIFAI_BASE_URL='https://api.clarifai.com/v2/ext/openai/v1'
```

### Optional: Pin to Specific Model Version

If you want to use a specific version of Claude Opus 4.5:

```env
CLARIFAI_MODEL='https://clarifai.com/anthropic/completion/models/claude-opus-4_5/versions/ee363bb3e6d3485ab0034bc454b41c52'
```

---

## 🔑 Getting Your Clarifai API Key

### Step 1: Login to Clarifai
1. Go to https://clarifai.com
2. Login with your account

### Step 2: Get Personal Access Token (PAT)
1. Click on your profile icon (top right)
2. Go to **Settings** → **Security**
3. Click **Create Personal Access Token**
4. Give it a name (e.g., "Hafiportrait Mastra")
5. Copy the token immediately (you won't see it again!)

### Step 3: Add to .env
```bash
# Open .env file
nano .env

# Add your token
CLARIFAI_PAT='your-token-here'
```

---

## 🤖 Model Configuration

### Option 1: Simple Model ID (Recommended)

```typescript
// src/mastra/agents/photo-curator.ts
import { Agent } from '@mastra/core/agent';

export const photoCurationAgent = new Agent({
  name: 'photo-curator',
  instructions: 'You are an expert photography curator...',
  model: 'clarifai/anthropic/completion/models/claude-opus-4_5',
});
```

**Pros:**
- ✅ Simpler configuration
- ✅ Auto-updates to latest model version
- ✅ Recommended by Mastra docs

### Option 2: Specific Model Version

```typescript
export const photoCurationAgent = new Agent({
  name: 'photo-curator',
  instructions: 'You are an expert photography curator...',
  model: 'https://clarifai.com/anthropic/completion/models/claude-opus-4_5/versions/ee363bb3e6d3485ab0034bc454b41c52',
});
```

**Pros:**
- ✅ Consistent behavior (pinned version)
- ✅ Predictable results
- ✅ Good for production stability

**Cons:**
- ❌ Won't auto-update to newer versions
- ❌ Need to manually update version ID

---

## 🧪 Testing Your Setup

### Test with Python (Official Clarifai Example)

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.clarifai.com/v2/ext/openai/v1",
    api_key="fc2eb155461948078288d439fa33b06c",
)

response = client.chat.completions.create(
    model="https://clarifai.com/anthropic/completion/models/claude-opus-4_5/versions/ee363bb3e6d3485ab0034bc454b41c52",
    messages=[
        {"role": "system", "content": "Talk like a pirate."},
        {
            "role": "user",
            "content": "How do I check if a Python object is an instance of a class?",
        },
    ],
    temperature=0.7,
    stream=False,
)

print(response)
```

### Test with Mastra Agent

```bash
# Start Mastra dev server
npm run mastra:dev

# Open Mastra Studio at http://localhost:4111
# Test the photo-curator agent interactively
```

### Test with cURL

```bash
curl -X POST "https://api.clarifai.com/v2/ext/openai/v1/chat/completions" \
  -H "Authorization: Key fc2eb155461948078288d439fa33b06c" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/completion/models/claude-opus-4_5",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

---

## 📊 Available Clarifai Models

| Model | Model ID | Context Window | Best For |
|-------|----------|----------------|----------|
| **Claude Opus 4.5** | `clarifai/anthropic/completion/models/claude-opus-4_5` | 200K | Photo curation, complex analysis |
| Claude Opus 4 | `clarifai/anthropic/completion/models/claude-opus-4` | 200K | High-end reasoning |
| Claude 3.5 Sonnet | `clarifai/anthropic/completion/models/claude-3-5-sonnet` | 200K | Balanced performance |
| GPT-4o | `clarifai/openai/chat-completion/models/gpt-4o` | 128K | Alternative option |

---

## 🔧 Troubleshooting

### Error: "Model does not exist"

**Cause:** Wrong model ID format

**Solution:** Use the correct format:
```typescript
// ✅ Correct
model: 'clarifai/anthropic/completion/models/claude-opus-4_5'

// ❌ Wrong (missing clarifai/ prefix)
model: 'anthropic/completion/models/claude-opus-4_5'
```

### Error: "401 Unauthorized"

**Cause:** Invalid or missing API key

**Solution:**
1. Check `CLARIFAI_PAT` in `.env`
2. Ensure token is valid (not expired)
3. Restart Mastra dev server

### Error: "404 Not Found"

**Cause:** Model version doesn't exist or wrong URL

**Solution:**
1. Use simple model ID (without version)
2. Or verify version ID is correct

---

## 📚 Reference

- **Clarifai Dashboard:** https://clarifai.com
- **Clarifai Security:** https://clarifai.com/settings/security
- **Mastra + Clarifai:** https://mastra.ai/models/providers/clarifai
- **Clarifai Models:** https://clarifai.com/anthropic/completion/models

---

## ✅ Checklist

- [ ] Clarifai account created
- [ ] Personal Access Token (PAT) generated
- [ ] `.env` file updated with `CLARIFAI_PAT`
- [ ] Agent configured with correct model ID
- [ ] Test connection with cURL or Python
- [ ] Mastra dev server running
- [ ] Agent tested in Mastra Studio

---

## 🚀 Next Steps

1. ✅ Setup complete
2. 🔲 Test agent in Mastra Studio
3. 🔲 Implement Cloudinary tool for photo access
4. 🔲 Run content factory workflow
5. 🔲 Deploy to Mastra Cloud
