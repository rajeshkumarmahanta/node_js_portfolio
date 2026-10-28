const express = require('express');
const { getData } = require('../utils/dataLoader');

const router = express.Router();

// Home
router.get('/', (req, res) => {
  const home = getData('home');
  const { projects } = getData('portfolio');
  const featured = projects.filter(p => p.featured).slice(0, home.featuredCount || 3);

  res.render('index', { pageTitle: home.pageTitle, home, featured });
});

// About
router.get('/about', (req, res) => {
  const about = getData('about');
  res.render('about', { pageTitle: about.pageTitle, about });
});

// Portfolio list
router.get('/portfolio', (req, res) => {
  const portfolio = getData('portfolio');
  res.render('portfolio', { pageTitle: portfolio.pageTitle, portfolio });
});

// Single project
router.get('/portfolio/:slug', (req, res, next) => {
  const { projects } = getData('portfolio');
  const index = projects.findIndex(p => p.slug === req.params.slug);
  if (index === -1) return next(); // falls through to 404

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next_ = projects[(index + 1) % projects.length];

  res.render('project', { pageTitle: project.title, project, prev, next: next_ });
});

// Contact (email only — no form)
router.get('/contact', (req, res) => {
  const contact = getData('contact');
  res.render('contact', { pageTitle: contact.pageTitle, contact });
});

module.exports = router;
