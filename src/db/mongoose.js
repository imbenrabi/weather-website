const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/weather-website-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})