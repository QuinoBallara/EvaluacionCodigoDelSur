const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    console.error('ERROR:', err.message);

    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});