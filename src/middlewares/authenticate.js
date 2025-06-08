const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const payload = jwt.verify(token, secretKey);
        req.email = payload.email;
        req.userId = payload.id;
        next();
    }
    catch (err) {
        console.error('Token validation error:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;