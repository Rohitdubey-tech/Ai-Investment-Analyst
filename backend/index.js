const express = require('express');
const cors = require('cors');
const { ChatGroq } = require('@langchain/groq');
const { z } = require('zod');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const responseSchema = z.object({
  decision: z.enum(['INVEST', 'PASS']),
  confidence: z.number(),
  reasoning: z.string(),
  sources: z.array(z.string())
});

app.post('/api/research', async (req, res) => {
  try {
    const { company } = req.body;
    if (!company) {
      return res.status(400).json({ error: 'Company name is required' });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'GROQ_API_KEY is not configured in the backend' });
    }

    const llm = new ChatGroq({
      model: 'llama-3.1-8b-instant',
      apiKey: process.env.GROQ_API_KEY,
    });

    const structuredLlm = llm.withStructuredOutput(responseSchema);
    
    const prompt = `
      Please act as a senior financial analyst.
      Analyze the following company: ${company}.
      
      Provide a brief analysis covering:
      1. Recent financial performance.
      2. Market trends and competitors.
      3. Key risks and tailwinds.
      4. General news sentiment.

      Conclude with a definitive decision to either "INVEST" or "PASS".
      Provide a confidence score (0-100) and a detailed paragraph explaining your reasoning.
      Include 2-3 realistic URL sources (e.g., Yahoo Finance, Reuters) where this data could be verified.
    `;

    try {
      const result = await structuredLlm.invoke(prompt);
      
      // Ensure confidence is formatted as a 0-100 integer if the LLM returned a decimal (0.9 -> 90)
      if (result.confidence <= 1) {
        result.confidence = Math.round(result.confidence * 100);
      }
      
      return res.json(result);
    } catch (apiError) {
      console.error("API Error caught:", apiError.message);
      return res.status(500).json({ error: 'Failed to generate response from Groq.' });
    }
  } catch (error) {
    console.error('Research API Error:', error);
    return res.status(500).json({ error: error.message || 'An error occurred' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
