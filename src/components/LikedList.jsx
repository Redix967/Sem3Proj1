import "../styles/LikedList.css";

export default function LikedList({ likedQuotes }) {
  return (
    <section className="liked-list" aria-label="Liked quotes">
      <h2 className="liked-list__heading">
        Your Collection
        <span className="liked-list__count">{likedQuotes.length}</span>
      </h2>

      <ul className="liked-list__items">
        {likedQuotes.map(({ id, quote, author }) => (
          <li key={id} className="liked-item">
            <p className="liked-item__quote">"{quote}"</p>
            <p className="liked-item__author">— {author}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
