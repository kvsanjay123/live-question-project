const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
console.log('MongoDB URI:', process.env.MONGO_URI);

//Intialize Express
const app = express();
//Middleware
app.use(cors());
app.use(express.json());
//mongoDB connection

mongoose.connect(process.env.MONGO_URI,
    {
       useNewUrlParser:true,useUnifiedTopology:true})
       .then(()=>console.log("MongoDB connected successfully")) 
       .catch(err=>console.error('MongoDB connection failed:', err));
       //Routes
       const questionRoutes = require('./routes/questions');
       app.use('/api/questions', questionRoutes);

        //Server start
        const PORT = process.env.PORT || 5000;
        app.listen(PORT,'0.0.0.0', () => console.log
        (`Server running on port ${PORT}`));

    
    
        


    
