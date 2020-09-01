const express = require('express');
const router = express.Router();
const RegisterController = require('../Controllers/Register.controller');

//Middleware specificly for these routes only
router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`);
  next();
});

router.post('/token', (req, res) => {
  res.json(true);
});

router.post('/register', RegisterController);

module.exports = router;
