import { useState, useEffect } from "react";
import QuoteCard from "./components/QuoteCard";
import LikedList from "./components/LikedList";
import "./App.css";

const STORAGE_KEY = "motivation_liked_quotes";

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likedQuotes, setLikedQuotes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Fetch quote on initial mount
  useEffect(() => {
    fetchQuote();
  }, []);

  // Sync likedQuotes to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likedQuotes));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }, [likedQuotes]);

  async function fetchQuote() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (err) {
      setError("Failed to fetch a quote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLikeToggle() {
    if (!quote) return;
    const alreadyLiked = likedQuotes.some((q) => q.quote === quote);
    if (alreadyLiked) {
      setLikedQuotes((prev) => prev.filter((q) => q.quote !== quote));
    } else {
      setLikedQuotes((prev) => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, quote, author },
      ]);
    }
  }

  const isCurrentLiked = likedQuotes.some((q) => q.quote === quote);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Daily Motivation</h1>
        <span className="liked-counter">♥ {likedQuotes.length} Liked</span>
      </header>

      <main className="app-main">
        <QuoteCard
          quote={quote}
          author={author}
          isLoading={isLoading}
          error={error}
          isLiked={isCurrentLiked}
          onNewQuote={fetchQuote}
          onLike={handleLikeToggle}
        />

        {likedQuotes.length > 0 && <LikedList likedQuotes={likedQuotes} />}
      </main>
    </div>
  );
}
