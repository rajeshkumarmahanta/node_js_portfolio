const express = require('express');
const { getData, dataExists } = require('../utils/dataLoader');

const router = express.Router();

// GET /api/portfolio/:slug -> one project as JSON
router.get('/portfolio/:slug', (req, res) => {
  const { projects } = getData('portfolio');
  const project = projects.find(p => p.slug === req.params.slug);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

// GET /api/:page -> raw JSON for any file in /data (home, about, portfolio, contact, site)
router.get('/:page', (req, res) => {
  const { page } = req.params;
  if (!dataExists(page)) return res.status(404).json({ error: `No data for "${page}"` });
  res.json(getData(page));
});

module.exports = router;
