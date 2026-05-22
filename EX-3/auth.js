
export default function auth(req, res, next) {
    const { token } = req.query;
    const validToken = process.env.EX3_TOKEN || 'xyz123';
    if (!token || token !== validToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}
