import { useState } from 'react';
import { ArrowRight, ExternalLink, Activity, ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react';
import './index.css';

function App() {
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleResearch = async (e) => {
    e.preventDefault();
    if (!company) return;

    setLoading(true);
    setResult(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${apiUrl}/api/research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company })
      });

      if (!res.ok) throw new Error('Research failed');
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('An error occurred during research. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">AI Investment Analyst</h1>
        <p className="subtitle">Data-driven research and investment decisions in seconds.</p>
      </div>

      <div className="glass-card">
        <form onSubmit={handleResearch} className="search-form">
          <input 
            type="text" 
            placeholder="Enter a company name (e.g. Apple, Tesla)..." 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="search-input"
            disabled={loading}
          />
          <button type="submit" className="search-button" disabled={loading || !company}>
            {loading ? (
              <Loader2 className="spinner" style={{ border: 'none' }} />
            ) : (
              <>
                Research <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
            <Activity size={48} style={{ margin: '0 auto 1rem', display: 'block', color: 'var(--accent-color)', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <p>Gathering financial data, recent news, and analyzing market trends for {company}...</p>
          </div>
        )}

        {result && !loading && (
          <div className="result-container">
            <div className="decision-wrapper">
              <div className={`decision-badge ${result.decision === 'INVEST' ? 'decision-invest' : 'decision-pass'}`}>
                {result.decision === 'INVEST' ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />}
                {result.decision}
              </div>
            </div>

            <div className="confidence-section">
              <div className="confidence-header">
                <span>Confidence Score</span>
                <span>{result.confidence}%</span>
              </div>
              <div className="confidence-bar-bg">
                <div 
                  className={`confidence-fill ${result.decision === 'INVEST' ? 'confidence-invest' : 'confidence-pass'}`}
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
            </div>

            <div className="section-title">
              Investment Thesis & Reasoning
            </div>
            <div className="reasoning">
              {result.reasoning}
            </div>

            <div className="section-title">
              Data Sources
            </div>
            <ul className="sources-list">
              {result.sources?.map((source, idx) => (
                <li key={idx}>
                  <a href={source} target="_blank" rel="noopener noreferrer" className="source-item">
                    <ExternalLink size={16} className="source-icon" />
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
