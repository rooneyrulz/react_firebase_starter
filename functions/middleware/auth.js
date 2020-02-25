const admin = require('firebase-admin');

const auth = async (req, res, next) => {
  const token = req.header('authorization');

  if (!token) return res.status(401).send('No token, authorization denied!');

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded) return res.status(500).send('Something went wrong!');

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Invalid signature!');
  }
};

module.exports = auth;
