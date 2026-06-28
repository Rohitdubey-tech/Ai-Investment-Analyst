# AI Investment Research Agent

## About the Project

This project is a full-stack AI-powered Investment Research Agent built as part of the AI Product Development Engineer (Intern) assignment.

The application accepts a company name, analyzes it using Google's Gemini model through LangChain, and generates an investment recommendation — either **INVEST** or **PASS**. Along with the recommendation, it provides a confidence score, reasoning, potential risks, and reference sources in a structured format.

The main objective was to build something that is simple to use, easy to maintain, and capable of returning consistent responses from the LLM.

---

## Tech Stack

### Frontend

* React
* Vite
* Vanilla CSS

### Backend

* Node.js
* Express.js

### AI

* LangChain
* Gemini 2.0 Flash (`@langchain/google-genai`)

---

## Project Structure

```
project/
│
├── frontend/     # React application
└── backend/      # Express API + LangChain logic
```

The frontend and backend are kept separate so they can be developed and deployed independently.

---

## Design Decisions

### Separate Frontend and Backend

Instead of building everything together, I separated the React frontend from the Express backend. This keeps the codebase cleaner and makes it easier to extend or replace individual components later.

### Structured LLM Output

One challenge with LLMs is that they don't always return responses in the same format. To solve this, I used LangChain's `withStructuredOutput()` so the model always returns a predictable JSON object. This makes the frontend much more reliable.

### Custom Styling

I used plain CSS instead of Tailwind. The goal was to demonstrate my understanding of CSS fundamentals while building a clean UI with glassmorphism effects, animations, and responsive layouts.

### AI Research

For this assignment, the research is generated using Gemini's reasoning capabilities instead of live financial APIs. This keeps the project lightweight and avoids requiring multiple API integrations while still demonstrating the overall workflow.

### Fallback for API Limits

Free Gemini API keys often run into rate limits (`429 Quota Exceeded`). To avoid the application breaking during testing, I added a fallback response. If the API request fails because of quota limits, the backend returns sample investment data so reviewers can still explore the UI.

---

# Running the Project

## Prerequisites

* Node.js (v18 or above)
* npm

---

## 1. Start the Backend

Open a terminal and run:

```bash
cd backend
npm install
node index.js
```

The backend will start on:

```
http://localhost:5001
```

---

## 2. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal (usually):

```
http://localhost:5173
```

---

## Features

* Search any company
* AI-generated investment recommendation
* Confidence score
* Key reasoning
* Risk analysis
* Reference sources
* Clean and responsive UI
* Handles Gemini API quota errors gracefully

---

## Sample Output

### Company

Apple Inc.

### Recommendation

**INVEST**

### Confidence

**85%**

### Summary

Apple continues to maintain strong financial performance, supported by consistent revenue growth, a growing services business, and significant cash reserves. While competition and regulatory challenges remain, its overall market position makes it a strong long-term investment candidate.

### Sources

* Bloomberg (Simulated)
* Yahoo Finance

---

## Future Improvements

If I continue working on this project, I would like to add:

* Live financial market data
* News aggregation
* Stock price charts
* Historical financial metrics
* Multi-company comparison
* User authentication
* Investment history
* Export reports as PDF

---

## Notes

The application currently uses Gemini for analysis. Since free API keys are subject to rate limits, a fallback response has been added to ensure the project remains functional during evaluation.
