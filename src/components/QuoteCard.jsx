import "../styles/QuoteCard.css";

export default function QuoteCard({
  quote,
  author,
  isLoading,
  error,
  isLiked,
  onNewQuote,
  onLike,
}) {
  return (
    <div className="quote-card">
      <div className="quote-card__body">
        {isLoading ? (
          <div className="quote-card__loading" aria-live="polite">
            <span className="spinner" aria-hidden="true" />
            <span>Finding your quote...</span>
          </div>
        ) : error ? (
          <p className="quote-card__error" role="alert">{error}</p>
        ) : (
          <>
            <blockquote className="quote-card__text">
              <span className="quote-mark">"</span>
              {quote}
              <span className="quote-mark">"</span>
            </blockquote>
            <p className="quote-card__author">— {author}</p>
          </>
        )}
      </div>

      <div className="quote-card__actions">
        <button
          className={`btn btn--like ${isLiked ? "btn--liked" : ""}`}
          onClick={onLike}
          disabled={isLoading || !quote}
          aria-label={isLiked ? "Unlike this quote" : "Like this quote"}
        >
          {isLiked ? "♥ Liked" : "♡ Like"}
        </button>

        <button
          className="btn btn--new"
          onClick={onNewQuote}
          disabled={isLoading}
          aria-label="Fetch a new random quote"
        >
          {isLoading ? "Loading..." : "New Quote →"}
        </button>
      </div>
    </div>
  );
}
