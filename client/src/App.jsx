import { useState, useEffect } from "react";

export default function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [newReview, setNewReview] = useState({ user: "", comment: "", stars: 5 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  const selectBook = async (book) => {
    setSelectedBook(book);
    setReviews([]);
    setLoadingReviews(true);
    const res = await fetch(`/api/books/${book.id}/reviews`);
    const data = await res.json();
    setReviews(data);
    setLoadingReviews(false);
  };

  const submitReview = async () => {
    if (!newReview.user || !newReview.comment) return;
    setSubmitting(true);
    const res = await fetch(`/api/books/${selectedBook.id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });
    const added = await res.json();
    setReviews([...reviews, added]);
    setNewReview({ user: "", comment: "", stars: 5 });
    setSubmitting(false);
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ borderBottom: "2px solid #eee", paddingBottom: "0.5rem" }}>
        Book Reviews
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Book List */}
        <div>
          <h2 style={{ fontSize: 18, marginBottom: "1rem" }}>Browse Books</h2>
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => selectBook(book)}
              style={{
                display: "flex",
                gap: 12,
                padding: 12,
                marginBottom: 10,
                border: selectedBook?.id === book.id ? "2px solid #4f46e5" : "1px solid #e5e7eb",
                borderRadius: 8,
                cursor: "pointer",
                background: selectedBook?.id === book.id ? "#eef2ff" : "#fff",
              }}
            >
              <img
                src={book.cover}
                alt={book.title}
                style={{ width: 50, height: 70, objectFit: "cover", borderRadius: 4 }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{book.title}</div>
                <div style={{ color: "#6b7280", fontSize: 13 }}>{book.author}</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  <span style={{ background: "#f3f4f6", padding: "2px 6px", borderRadius: 4 }}>
                    {book.genre}
                  </span>
                  <span style={{ marginLeft: 8 }}>{"★".repeat(Math.round(book.rating))} {book.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Panel */}
        <div>
          {!selectedBook ? (
            <div style={{ color: "#9ca3af", marginTop: "4rem", textAlign: "center" }}>
              Select a book to see its reviews
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: 18, marginBottom: "0.25rem" }}>{selectedBook.title}</h2>
              <p style={{ color: "#6b7280", fontSize: 14, marginBottom: "1rem" }}>
                {selectedBook.author}
              </p>

              <h3 style={{ fontSize: 15, marginBottom: "0.75rem" }}>Reviews</h3>

              {loadingReviews ? (
                <div style={{ color: "#6b7280", fontSize: 14 }}>Loading reviews...</div>
              ) : reviews.length === 0 ? (
                <div style={{ color: "#9ca3af", fontSize: 14 }}>No reviews yet.</div>
              ) : (
                reviews.map((r) => (
                  <div
                    key={r.id}
                    style={{ background: "#f9fafb", padding: 12, borderRadius: 8, marginBottom: 8 }}
                  >
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.user}</div>
                    <div style={{ fontSize: 13, color: "#374151", margin: "4px 0" }}>{r.comment}</div>
                    <div style={{ fontSize: 12, color: "#f59e0b" }}>{"★".repeat(r.stars)}</div>
                  </div>
                ))
              )}

              {/* Add Review */}
              <div style={{ marginTop: "1.5rem", borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
                <h3 style={{ fontSize: 15, marginBottom: "0.75rem" }}>Add a Review</h3>
                <input
                  placeholder="Your name"
                  value={newReview.user}
                  onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                  style={{ display: "block", width: "100%", marginBottom: 8, padding: 8, borderRadius: 6, border: "1px solid #d1d5db", boxSizing: "border-box" }}
                />
                <textarea
                  placeholder="Your review"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={3}
                  style={{ display: "block", width: "100%", marginBottom: 8, padding: 8, borderRadius: 6, border: "1px solid #d1d5db", boxSizing: "border-box" }}
                />
                <select
                  value={newReview.stars}
                  onChange={(e) => setNewReview({ ...newReview, stars: parseInt(e.target.value) })}
                  style={{ marginBottom: 10, padding: 6, borderRadius: 6, border: "1px solid #d1d5db" }}
                >
                  {[5, 4, 3, 2, 1].map((s) => (
                    <option key={s} value={s}>{s} star{s !== 1 ? "s" : ""}</option>
                  ))}
                </select>
                <br />
                <button
                  onClick={submitReview}
                  disabled={submitting}
                  style={{ background: "#4f46e5", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 14 }}
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
