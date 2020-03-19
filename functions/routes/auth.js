const { Router } = require('express');
const firebase = require('firebase');

const router = Router({ strict: true });

// ROUTE            >     POST  /api/auth/signup
// DESCRIPTION      >     SIGNUP USER
// ACCESS CONTROL   >     PUBLIC
router.post('/signup', async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email) return res.status(400).send('Email is required!');
  if (!password) return res.status(400).send('Password is required!');
  if (!confirmPassword || password !== confirmPassword)
    return res.status(400).send('Passwords dont match!');

  // try {
  //   const data = await firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password);
  //   // const token = data.user.getIdToken();
  //   console.log(data.user.getIdToken());
  //   // return res.status(201).json({ token });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).send(error.code);
  // }

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(user); // this is shown. Firebase user and provider data
          console.log(user.uid); // Shown
          firebase
            .auth()
            .user.getIdToken()
            .then(function(idToken) {
              console.log(idToken + '--'); // Nothing happens. No errors and the function not continues
            });
          console.log(user.uid); // Nothing happens
        }
      });
    })
    .catch(error => {
      console.log(error);
      return res.status(500).send(error.code);
    });
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
