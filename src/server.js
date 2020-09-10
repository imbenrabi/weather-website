const express = require('express');

require('./db/mongoose');
const router = require('./routes/api');
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
    console.log(`Listening is up on port ${port}`);
})
