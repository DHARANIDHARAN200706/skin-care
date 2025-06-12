// /pages/index.js
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [imageUrl, setImageUrl] = useState('');
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

    const urlMatch = data.reply.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|webp))/i);
    setImageUrl(urlMatch ? urlMatch[0] : '');

    setLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <style>{`
          body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(to bottom right, #f0f8ff, #e6f0ff);
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
            background-color: #1e3a8a;
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
            color: #ffd700;
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
            color: #1e3a8a;
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
            border: 2px solid #60a5fa;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-size: 1rem;
            resize: vertical;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s;
          }

          textarea:focus {
            outline: none;
            border-color: #2563eb;
            transform: scale(1.02);
          }

          button {
            background: linear-gradient(to right, #2563eb, #1e40af);
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
            background: linear-gradient(to right, #1e40af, #1e3a8a);
          }

          .response-box {
            margin-top: 2rem;
            background: white;
            border: 1px solid #bfdbfe;
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            animation: fadeIn 1s ease-in;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }

          .response-box img {
            margin-top: 1rem;
            width: 100%;
            max-height: 300px;
            object-fit: cover;
            border-radius: 0.5rem;
          }

          footer {
            margin-top: 3rem;
            padding: 1rem;
            text-align: center;
            color: #6b7280;
            border-top: 1px solid #dbeafe;
          }
        `}</style>
      </Head>

      <nav>
        <h1>URWISH</h1>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      <main className="main-content">
        <h2>AI-Powered Shoe Recommendation</h2>
        <textarea
          rows={5}
          placeholder="e.g.,Recommend a shoe for sports..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Loading...' : 'Get Recommendation'}
        </button>

        {response && (
          <div className="response-box">
            <h3>Recommended Shoe:</h3>
            <p>{response}</p>
            {imageUrl && (
              <img src={imageUrl} alt="Recommended Shoe" />
            )}
          </div>
        )}
      </main>

      
    </div>
  );
}
