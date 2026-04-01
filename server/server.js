import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const books = [
  {
    id: 1,
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    cover: "https://covers.openlibrary.org/b/id/8739161-M.jpg",
    genre: "Technology",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "https://covers.openlibrary.org/b/id/8681944-M.jpg",
    genre: "Technology",
    rating: 4.6,
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://covers.openlibrary.org/b/id/7222246-M.jpg",
    genre: "Fiction",
    rating: 4.2,
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://covers.openlibrary.org/b/id/10521270-M.jpg",
    genre: "Self-Help",
    rating: 4.9,
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://covers.openlibrary.org/b/id/8353661-M.jpg",
    genre: "Sci-Fi",
    rating: 4.7,
  },
];

const reviews = {
  1: [
    { id: 1, user: "Alice", comment: "Changed how I think about software.", stars: 5 },
    { id: 2, user: "Bob", comment: "Dense but worth every page.", stars: 4 },
  ],
  2: [
    { id: 1, user: "Carol", comment: "Essential reading for any developer.", stars: 5 },
  ],
  3: [
    { id: 1, user: "Dan", comment: "Beautiful prose, haunting story.", stars: 4 },
    { id: 2, user: "Eve", comment: "A classic for a reason.", stars: 5 },
  ],
  4: [
    { id: 1, user: "Frank", comment: "Small changes, big results.", stars: 5 },
  ],
  5: [
    { id: 1, user: "Grace", comment: "World-building like nothing else.", stars: 5 },
    { id: 2, user: "Hank", comment: "Slow start but totally worth it.", stars: 4 },
  ],
};

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

app.get("/api/books/:id/reviews", (req, res) => {
  const bookReviews = reviews[parseInt(req.params.id)] || [];
  res.json(bookReviews);
});

app.post("/api/books/:id/reviews", (req, res) => {
  const { user, comment, stars } = req.body;
  const id = parseInt(req.params.id);
  if (!reviews[id]) reviews[id] = [];
  const newReview = { id: reviews[id].length + 1, user, comment, stars };
  reviews[id].push(newReview);
  res.status(201).json(newReview);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
