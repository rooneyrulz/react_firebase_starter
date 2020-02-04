const { Router } = require('express');

const router = Router({ strict: true });

// TESTING ROUTE
router.get('/', (req, res, next) => res.status(200).send('It works...!'));

module.exports = router;
