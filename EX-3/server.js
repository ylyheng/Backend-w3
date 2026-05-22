
import express from 'express';
import logger from './logger.js';
import validateQuery from './validateQuery.js';
import auth from './auth.js';
import courses from './courses.js';

const app = express();
const PORT = 3001;


app.use(logger);


app.get('/departments/:dept/courses', validateQuery, auth, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    const results = courses.filter((c) => {
        if (typeof c.department !== 'string' || c.department.toLowerCase() !== String(dept).toLowerCase()) return false;
        if (level && String(c.level).toLowerCase() !== String(level).toLowerCase()) return false;
        if (minCredits !== undefined && Number(c.credits) < Number(minCredits)) return false;
        if (maxCredits !== undefined && Number(c.credits) > Number(maxCredits)) return false;
        if (semester && String(c.semester).toLowerCase() !== String(semester).toLowerCase()) return false;
        if (instructor && !String(c.instructor).toLowerCase().includes(String(instructor).toLowerCase())) return false;
        return true;
    });

    return res.json({ results, meta: { total: results.length } });
});

app.listen(PORT, () => {
    console.log(`EX-3 server running on http://localhost:${PORT}`);
});
