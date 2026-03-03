require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const medicationRoutes = require('./src/routes/medication.routes');

// ROUTES IMPORTS
const deviceRoutes = require('./src/routes/device.routes');

// INITIALIZE EXPRESS FIRST
const app = express();

// CONNECT DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());

app.use('/api/medications', medicationRoutes);

// ROUTES
app.use('/api/device', deviceRoutes);

// TEST ROUTE
app.get('/', (req, res) => {
  res.json({ message: "Backend Running 🚀" });
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});