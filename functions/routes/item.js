const { Router } = require('express');

const router = Router({ strict: true });

// exports.getShoppingItems = functions.https.onRequest(async (req, res, next) => {
//   try {
//     const data = await admin
//       .firestore()
//       .collection('shopping_item')
//       .get();
//     return res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
