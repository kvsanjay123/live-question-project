const mongoose = require('mongoose');
const uri = 'mongodb+srv://searchinnovative:<password>@cluster0.sk4rj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully!');
    mongoose.connection.close(); // Close the connection after testing
  })
  .catch(err => {
    console.log('Connection error:', err);
  });
