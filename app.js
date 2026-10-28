const express = require('express');
const path = require('path');
const { getData } = require('./utils/dataLoader');
const pageRoutes = require('./routes/pages');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets (css, js, images)
app.use(express.static(path.join(__dirname, 'public')));

// Global data available in every view (navbar, footer, email, socials)
app.use((req, res, next) => {
  res.locals.site = getData('site');
  res.locals.currentPath = req.path;
  res.locals.year = new Date().getFullYear();
  next();
});

// Routes
app.use('/', pageRoutes);
app.use('/api', apiRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

// 500
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('404', {
    pageTitle: 'Something went wrong',
    errorMessage: 'Something went wrong on the server. Please try again later.'
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
