const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

console.log('MongoDB URI:', process.env.MONGO_URI);

// Initialize Express
const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'https://telangana-group3-key.vercel.app', // Your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you use cookies or auth headers
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Live Question Project!');
});

// Routes
const questionRoutes = require('./routes/questions');
app.use('/api/questions', questionRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
