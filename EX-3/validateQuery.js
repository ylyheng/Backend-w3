
export default function validateQuery(req, res, next) {
    const { minCredits, maxCredits } = req.query;
    let parsedMin;
    let parsedMax;

    if (minCredits !== undefined) {
        parsedMin = parseInt(minCredits, 10);
        if (Number.isNaN(parsedMin)) {
            return res.status(400).json({ error: 'minCredits must be an integer' });
        }
        req.query.minCredits = parsedMin;
    }

    if (maxCredits !== undefined) {
        parsedMax = parseInt(maxCredits, 10);
        if (Number.isNaN(parsedMax)) {
            return res.status(400).json({ error: 'maxCredits must be an integer' });
        }
        req.query.maxCredits = parsedMax;
    }

    if (parsedMin !== undefined && parsedMax !== undefined && parsedMin > parsedMax) {
        return res.status(400).json({ error: 'Invalid credit range: minCredits cannot be greater than maxCredits' });
    }

    next();
}
