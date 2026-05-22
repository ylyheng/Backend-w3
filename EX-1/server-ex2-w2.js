const express = require('express');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.path}`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).type('html').send(`
        <html>
            <head><title>Home</title></head>
            <body>
                <h1>Welcome to the Home Page</h1>
                <p>This is a simple Node.js server.</p>
            </body>
        </html>
    `);
});

app.get('/about', (req, res) => {
    res.status(200).type('text').send('About us: at CADT, we love node.js!');
});

app.get('/contact-us', (req, res) => {
    res.status(200).type('text').send('You can reach us via email...');
});

app.get('/products', (req, res) => {
    res.status(200).type('text').send('Buy one get one...');
});

app.get('/projects', (req, res) => {
    res.status(200).type('text').send('Here are our awesome projects');
});

const methodNotAllowed = (req, res) => {
    res.status(405).type('text').send('405 Method Not Allowed');
};

app.all('/', methodNotAllowed);
app.all('/about', methodNotAllowed);
app.all('/contact-us', methodNotAllowed);
app.all('/products', methodNotAllowed);
app.all('/projects', methodNotAllowed);

app.use((req, res) => {
    res.status(404).type('text').send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
