const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const { readJSON, writeJSON } = require('../helpers/fileHandler');

const USERS_FILE = process.env.USERS_FILE || 'data/users.txt';
const SECRET_KEY = process.env.JWT_SECRET_KEY

async function register(req, res, next) {
    try {
        const { email, firstName, lastName, password } = req.body;
        const users = readJSON(USERS_FILE);

        if (users.find(user => user.email === email)) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: uuid.v4(),
            email,
            firstName,
            lastName,
            password: hashedPassword,
        };

        users.push(newUser);
        writeJSON(USERS_FILE, users);
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Registration error:', error);
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const users = readJSON(USERS_FILE);
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: '48h'
        })

        res.status(200).json({
            message: 'Login successful',
            token
        });
    }
    catch (error) {
        console.error('Login error:', error);
        next(error);
    }
}

module.exports = { register, login };