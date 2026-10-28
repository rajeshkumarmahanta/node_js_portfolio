const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const isProd = process.env.NODE_ENV === 'production';
const cache = new Map();

/**
 * Read a JSON file from the /data folder.
 * In development the file is re-read on every request, so edits to the
 * JSON show up instantly on refresh. In production the result is cached.
 */
function getData(name) {
  if (!/^[a-z0-9-]+$/i.test(name)) {
    throw new Error(`Invalid data file name: ${name}`);
  }
  if (isProd && cache.has(name)) return cache.get(name);

  const file = path.join(DATA_DIR, `${name}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  if (isProd) cache.set(name, data);
  return data;
}

function dataExists(name) {
  if (!/^[a-z0-9-]+$/i.test(name)) return false;
  return fs.existsSync(path.join(DATA_DIR, `${name}.json`));
}

module.exports = { getData, dataExists };
