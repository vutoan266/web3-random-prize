const express = require('express');
const next = require('next');
const mongoose = require('mongoose');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose
    .connect(
        'mongodb+srv://vutoan266:allbeok6062@web3randomprize.oeov6.mongodb.net/web3RandomPrize?retryWrites=true&w=majority'
    )
    .then(() => console.log('Mongoose connected!'))
    .catch((err) => console.log(err));

app.prepare().then(() => {
    const server = express();

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
