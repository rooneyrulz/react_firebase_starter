const { Router } = require('express');
const firebase = require('firebase');

const router = Router({ strict: true });

// ROUTE            >     POST  /api/auth/signup
// DESCRIPTION      >     SIGNUP USER
// ACCESS CONTROL   >     PUBLIC
router.post('/signup', async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email.trim()) return res.status(400).send('Email is required!');
  if (!password.trim()) return res.status(400).send('Password is required!');
  if (!confirmPassword.trim() || password.trim() !== confirmPassword.trim())
    return res.status(400).send('Passwords dont match!');

  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const token = data.user.getIdToken();
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong!');
  }
});

// ROUTE            >     POST  /api/auth/login
// DESCRIPTION      >     SIGNIN USER
// ACCESS CONTROL   >     PUBLIC
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email.trim()) return res.status(400).send('Email is required!');
  if (!password.trim()) return res.status(400).send('Password is required!');

  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const token = data.user.getIdToken();
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong!');
  }
});

module.exports = router;
