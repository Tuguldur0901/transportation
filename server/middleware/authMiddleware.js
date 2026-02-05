const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Header-ээс token-ийг авна
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Нэвтрэх эрхгүй байна, токен олдсонгүй." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Хэрэглэгчийн ID-г request дотор хадгална
        next();
    } catch (err) {
        res.status(401).json({ error: "Токен хүчингүй байна." });
    }
};