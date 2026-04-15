import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
    const categories = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(categories),
        datasets: [
            {
                label: 'Spending by Category',
                data: Object.values(categories),
                backgroundColor: [
                    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Spending Analysis</h3>
            <div className="h-64 flex justify-center">
                <Doughnut data={data} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default ExpenseChart;