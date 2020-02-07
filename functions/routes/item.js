const { Router } = require('express');
const admin = require('firebase-admin');

const router = Router({ strict: true });

router.get('/', async (req, res, next) => {
  let itemList = [];
  try {
    const data = await admin
      .firestore()
      .collection('shopping_item')
      .get();

    data.forEach(doc =>
      itemList.push({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        createdAt: doc.data().createdAt
      })
    );

    return res.status(200).json(itemList);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong!');
  }
});

module.exports = router;
