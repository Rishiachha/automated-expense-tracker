const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
    getExpenses, 
    addExpense, 
    updateExpense, 
    deleteExpense 
} = require('../controllers/expenseController');
const { getFinancialInsights } = require('../controllers/insightController');

// All routes require authentication
router.use(auth);

// --- 1. STATIC/SPECIFIC ROUTES FIRST ---
// This must come BEFORE any routes with :id
router.get('/insights/analysis', getFinancialInsights);

// --- 2. GENERAL CRUD ROUTES ---
router.get('/', getExpenses);
router.post('/', addExpense);

// --- 3. DYNAMIC ID ROUTES LAST ---
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;