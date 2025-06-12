// pages/practice.js
import { useState } from 'react';

export default function Practice() {
  const [question, setQuestion] = useState("Tell me about yourself.");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `Give feedback on this answer for a job interview: ${answer}` })
    });
    const data = await res.json();
    setFeedback(data.choices?.[0]?.message?.content || "No feedback received.");
    setLoading(false);
  };

  return (
    <div className="main-container">
      
      {/* Main Content */}
      <main className="main-content">
        <section className="practice-section">
          <div className="practice-header">
            <h1 className="practice-title">Practice Mode</h1>
            <p className="practice-subtitle">Improve your interview skills with AI-powered feedback</p>
          </div>

          <div className="interview-card">
            <div className="question-section">
              <h2 className="question-label">Interview Question:</h2>
              <p className="question-text">{question}</p>
            </div>

            <div className="answer-section">
              <label htmlFor="answer" className="answer-label">Your Response:</label>
              <textarea
                id="answer"
                className="answer-textarea"
                rows="6"
                placeholder="Type your response here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>

            <div className="submit-section">
              <button
                onClick={handleSubmit}
                disabled={loading || !answer.trim()}
                className="submit-button"
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  "Get AI Feedback"
                )}
              </button>
            </div>

            {feedback && (
              <div className="feedback-section">
                <h2 className="feedback-title">AI Feedback:</h2>
                <div className="feedback-content">
                  <p>{feedback}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <nav className="footer-nav">
          <a href="/" className="footer-link">Home</a>
          <a href="/practice" className="footer-link">Practice</a>
          <a href="/contact" className="footer-link">Contact</a>
        </nav>
        <p>© 2025 Echo. All rights reserved.</p>
      </footer>
    </div>
  );
}