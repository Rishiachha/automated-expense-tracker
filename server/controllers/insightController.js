const Expense = require('../models/Expense');
const axios = require('axios');

exports.getFinancialInsights = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });

        if (!expenses || expenses.length === 0) {
            return res.status(200).json({
                totalThisMonth: 0,
                predictedNextMonth: 0,
                insights: ["Add some expenses to see AI insights!"]
            });
        }

        const now = new Date();
        const thisMonthExpenses = expenses.filter(e => 
            new Date(e.date).getMonth() === now.getMonth()
        );
        const totalThisMonth = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

        // Simple history for AI (using real amounts or defaults if new)
        const history = [100, 200, 150, 300, totalThisMonth]; 

        let prediction = 0;
        try {
            const aiForecast = await axios.post('http://127.0.0.1:8000/forecast', {
                amounts: history
            });
            prediction = aiForecast.data.predicted_next_month;
        } catch (err) {
            prediction = totalThisMonth * 1.1; 
        }

        const insights = [];
        if (totalThisMonth > prediction && prediction > 0) {
            insights.push("⚠️ Alert: Spending is higher than your AI-predicted trend.");
        } else {
            insights.push("✅ Your spending is within a healthy predicted range.");
        }

        res.status(200).json({
            totalThisMonth,
            predictedNextMonth: prediction,
            insights
        });
    } catch (err) {
        console.error("Insight Error:", err.message);
        res.status(500).json({ message: "Error generating insights" });
    }
};