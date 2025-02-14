require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/Book");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: ["http://nb1.ma", "https://nb1.ma", "http://www.nb1.ma", "https://www.nb1.ma"], 
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true,
// }));
app.use(cors());


// Routes 
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching books.' });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const { title, desc, createdAt } = req.body;

    const newBook = new Book({ title, desc, createdAt });
    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the book.' });
  }
});

// Database connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
