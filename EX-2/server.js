// server.js
import express from 'express';
import courses from './course.js';
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    let { level, minCredits, maxCredits, semester, instructor } = req.query;

    // Parse numeric query params if provided
    if (minCredits !== undefined) minCredits = parseInt(minCredits, 10);
    if (maxCredits !== undefined) maxCredits = parseInt(maxCredits, 10);

    // Validate credit range
    if (!isNaN(minCredits) && !isNaN(maxCredits) && minCredits > maxCredits) {
        return res.status(400).json({ error: 'Invalid credit range: minCredits cannot be greater than maxCredits' });
    }

    const results = courses.filter((c) => {
        // Department filter (route param) - required
        if (typeof c.department !== 'string' || c.department.toLowerCase() !== String(dept).toLowerCase()) return false;

        // level - exact match (case-insensitive)
        if (level && String(c.level).toLowerCase() !== String(level).toLowerCase()) return false;

        // credits range
        if (!isNaN(minCredits) && Number(c.credits) < minCredits) return false;
        if (!isNaN(maxCredits) && Number(c.credits) > maxCredits) return false;

        // semester - exact match (case-insensitive)
        if (semester && String(c.semester).toLowerCase() !== String(semester).toLowerCase()) return false;

        // instructor - partial, case-insensitive match
        if (instructor && !String(c.instructor).toLowerCase().includes(String(instructor).toLowerCase())) return false;

        return true;
    });

    return res.json({ results, meta: { total: results.length } });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
