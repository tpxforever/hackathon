require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json()); // Middleware to parse JSON

connectDB(); // Connect to MongoDB

app.use('/api/users', userRoutes); // Use routes for user-related actions

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
