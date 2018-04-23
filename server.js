const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
      if(err) {
          console.log('unable to append server.log');
      }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my website.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
      pageTitle: 'About Page',
      welcomeMessage: ''
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
      pageTitle: 'Projects Page',
      welcomeMessage: ''
  });
});

app.get('/bad', (req, res) => {
  res.send({
      errorMessage: 'sample error message'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
