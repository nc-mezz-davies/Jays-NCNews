const validateComment = (req, res, next) => {
    const { body, author } = req.body;

    if (!body || !author) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    next();
}

module.exports = validateComment;