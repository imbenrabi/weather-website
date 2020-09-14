const express = require('express');
const path = require('path');

require('./db/mongoose');
const router = require('./routes/api');

const distPath = path.join(__dirname, '../dist');

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(express.static(distPath));

app.listen(port, () => {
    console.log(`Listening is up on port ${port}`);
})
