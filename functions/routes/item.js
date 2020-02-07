const { Router } = require('express');
const admin = require('firebase-admin');

const router = Router({ strict: true });

// ROUTE            >     GET  /api/items
// DESCRIPTION      >     GET ALL ITEMS
// ACCESS CONTROL   >     PUBLIC
router.get('/', async (req, res, next) => {
  let itemList = [];
  try {
    const data = await admin
      .firestore()
      .collection('shopping_item')
      .orderBy('createdAt', 'desc')
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

// ROUTE            >     POST  /api/items
// DESCRIPTION      >     ADD ITEMS
// ACCESS CONTROL   >     PUBLIC
router.post('/add', async (req, res, next) => {
  const { name, description } = req.body;

  if (!name) return res.status(400).send('Name is required!');

  if (!description) return res.status(400).send('Description is required!');

  try {
    const payload = {
      name: name,
      description: description,
      createdAt: new Date().toISOString()
    };

    const data = await admin
      .firestore()
      .collection('shopping_item')
      .add(payload);

    return res
      .status(201)
      .json({ message: `document created for ${data.id}!` });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong!');
  }
});

module.exports = router;
