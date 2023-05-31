const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection.find().toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.post('/', (request, response) => {
    const newSighting = request.body
    collection.insertOne(newSighting)
    .then(dataBaseResponse => response.json(dataBaseResponse.ops[0]))
    .catch((err) => {
      console.error(err);
      response.status(500);
      response.json({ status: 500, error: err });
    });
  })

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection.findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.delete('/:id', (request, response) => {
    const id = request.params.id
    collection.deleteOne({_id: ObjectID(id)})
    .then((result => response.json(result)))
    .catch((err) => {
      console.error(err);
      response.status(500);
      response.json({ status: 500, error: err });
    });
  })

  return router;
};

module.exports = createRouter;
