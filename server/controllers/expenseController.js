const Expense = require('../models/Expense');
const axios = require('axios');

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
        res.status(200).json({ success: true, data: expenses });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.addExpense = async (req, res) => {
    try {
        const { title, amount, description, date } = req.body;
        let category = 'Uncategorized';

        // --- AI CALL START ---
        try {
            // Calling the Python FastAPI service on port 8000
           const aiResponse = await axios.post(
    'https://automated-expense-tracker-7.onrender.com/predict',
    {
        title: title
    },
    {
        timeout: 3000
    }
);
            category = aiResponse.data.category;
            console.log(`AI Result: ${title} -> ${category}`);
        } catch (error) {
            console.log("AI Service offline or unreachable. Defaulting to 'Uncategorized'.");
        }
        // --- AI CALL END ---

        const expense = await Expense.create({
            userId: req.user.id,
            title,
            amount,
            description,
            date: date || Date.now(),
            category
        });

        res.status(201).json({ success: true, data: expense });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: expense });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};