const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Add both Vercel frontend URLs here
const allowedOrigins = [
  'https://telangana-group3-key.vercel.app',
  'https://telangana-group3.vercel.app', // Add any other possible Vercel subdomains if needed
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add other HTTP methods if necessary
  credentials: true, // Allow cookies if required
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

// Routes
const questionsRouter = require('./routes/questions');
app.use('/api/questions', questionsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
