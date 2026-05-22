const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const submissionsFilePath = path.join(__dirname, 'submissions.txt');

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).type('text').send('Welcome to the Home Page');
});

app.get('/contact', (req, res) => {
    res.status(200).type('html').send(`
        <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/contact', (req, res) => {
    const name = req.body.name ? String(req.body.name).trim() : '';

    console.log('Form submission:', name);

    fs.appendFile(submissionsFilePath, `${name}\n`, (err) => {
        if (err) {
            console.error('Failed to write submission:', err);
            return res.status(500).type('text').send('Internal Server Error');
        }

        return res.status(200).type('text').send('Submission received');
    });
});

app.use((req, res) => {
    res.status(404).type('text').send('404 Not Found');
});

app.listen(PORT, () => {
    console.log('Server is running at http://localhost:3000');
});
