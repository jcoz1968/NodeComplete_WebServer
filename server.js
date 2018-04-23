const express = require('express');

var app = express();

app.get('/', (req, res) => {
    // res.send('<h1></h1>Hello Express!</h1>');
    res.send({
        name: 'Jeffery',
        likes: [
            'walking',
            'lake'
        ]
    });
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'sample error message'
    });
});

app.listen(3000);