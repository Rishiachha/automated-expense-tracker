const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Basic check
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2. Check existence
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 3. Create and Save (This triggers the pre-save hook in User.js)
        user = new User({ name, email, password });
        await user.save();

        // 4. Token
        const secret = process.env.JWT_SECRET || 'fallback_secret_123';
        const token = jwt.sign({ user: { id: user._id } }, secret, { expiresIn: '24h' });

        res.status(201).json({
            token,
            user: { id: user._id, name, email }
        });
    } catch (err) {
        console.error("REGISTER ERROR:", err.message);
        res.status(500).json({ message: "Server error during registration", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const secret = process.env.JWT_SECRET || 'dev_secret_12345';
        const token = jwt.sign({ user: { id: user._id } }, secret, { expiresIn: '24h' });

        res.json({ token, user: { id: user._id, name: user.name, email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error during login' });
    }
};