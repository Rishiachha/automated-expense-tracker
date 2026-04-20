require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');

const app = express();

// =========================
// 1. GLOBAL MIDDLEWARE
// =========================
app.use(helmet());

app.use(cors({
    origin: '*', // ⚠️ Restrict later in production
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// 2. ROUTES
// =========================
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// ✅ ADD THIS (health check route)
app.get('/test', (req, res) => {
    res.send('API Running');
});

// =========================
// 3. DATABASE CONNECTION
// =========================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    });

// =========================
// 4. SERVER START
// =========================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// =========================
// 5. ERROR HANDLING
// =========================

// Catch unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err.message);
    server.close(() => process.exit(1));
});

// Catch sync errors
app.use((err, req, res, next) => {
    console.error('💥 SERVER CRASH:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message
    });
});