const express = require('express');
const { createRequestHandler } = require('@remix-run/express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.all(
  '*',
  createRequestHandler({
    build: require('./build'),
    mode: process.env.NODE_ENV,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});