const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Configure CORS
const allowedOrigins = [
  'https://telangana-group3-key.vercel.app',
  'https://telangana-group3.vercel.app',
  'https://localhost:3000',//for loacal hosting
];
const corsOptions = {
  origin: (origin,callback)=> {
    if(!origin || allowedOrigins.includes(origin))
    {
      callback(null,true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies if needed
};
app.use(cors(corsOptions));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error(`MongoDB connection error: ${err}`));

// Example root route (for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the Live Question Project!');
});

// API routes
const questionsRouter = require('./routes/questions'); // Make sure the route exists
app.use('/api/questions', questionsRouter);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Configure server timeouts (for Render)
server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds
