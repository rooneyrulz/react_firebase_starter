const { Router } = require('express');

const router = Router({ strict: true });

// ROUTE            >     POST  /api/auth/signup
// DESCRIPTION      >     SIGNUP USER
// ACCESS CONTROL   >     PUBLIC
router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).send('Email is required!');
  if (!password) return res.status(400).send('Password is required!');

  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong!');
  }
});

module.exports = router;
