// /pages/index.js
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <style>{`
          body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(to bottom right, #fff0f5, #e0f7fa);
          }

          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding: 0;
          }

          nav {
            width: 100%;
            background-color: #d63384;
            color: white;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            position: fixed;
            top: 0;
            z-index: 10;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }

          nav ul {
            display: flex;
            gap: 2rem;
          }

          nav li {
            cursor: pointer;
            transition: color 0.2s;
          }

          nav li:hover {
            color: #ffc107;
          }

          .main-content {
            padding-top: 100px;
            text-align: center;
            width: 90%;
            max-width: 800px;
          }

          h2 {
            font-size: 2.5rem;
            font-weight: bold;
            color: #d63384;
            margin-bottom: 1rem;
            animation: slideIn 0.8s ease-out;
          }

          @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          textarea {
            width: 100%;
            padding: 1rem;
            border: 2px solid #ffb3c6;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-size: 1rem;
            resize: vertical;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s;
          }

          textarea:focus {
            outline: none;
            border-color: #d63384;
            transform: scale(1.02);
          }

          button {
            background: linear-gradient(to right, #ff69b4, #d63384);
            color: white;
            padding: 0.75rem 2rem;
            font-weight: 600;
            border-radius: 9999px;
            border: none;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            cursor: pointer;
            transition: background 0.3s, transform 0.2s;
          }

          button:hover {
            transform: scale(1.05);
            background: linear-gradient(to right, #d63384, #c2185b);
          }

          .response-box {
            margin-top: 2rem;
            background: white;
            border: 1px solid #f8bbd0;
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            animation: fadeIn 1s ease-in;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }

          footer {
            margin-top: 3rem;
            padding: 1rem;
            text-align: center;
            color: #6b7280;
            border-top: 1px solid #f8bbd0;
          }
        `}</style>
      </Head>

      <nav>
        <h1>GlowCare</h1>
        <ul>
          <li>Home</li>
          <li>Shop</li>
          <li>Contact</li>
        </ul>
      </nav>

      <main className="main-content">
        <h2>AI Skin Care Product Advisor</h2>
        <p>Describe your skin concerns or goals and get personalized product suggestions from our AI!</p>
        <textarea
          rows={8}
          placeholder="e.g., I have oily skin and want a natural cleanser."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Finding products...' : 'Get Recommendations'}
        </button>

        {response && (
          <div className="response-box">
            <h3>Recommended Products:</h3>
            <p>{response}</p>
          </div>
        )}
      </main>

      <footer>© 2025 GlowCare. All rights reserved.</footer>
    </div>
  );
}
