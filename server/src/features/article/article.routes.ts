import express from "express";

// This will help us connect to the database
import { getCollection} from "../../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// Lazy getter for articles collection
const getArticlesCollection = () => getCollection("articles");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /article.
const router = express.Router();

// This section will help you get a list of all the articles.
router.get("/", async (req, res) => {
  let results = await getArticlesCollection().find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single article by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let result = await getArticlesCollection().findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new article.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let result = await getArticlesCollection().insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding article");
  }
});

// This section will help you update a article by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        content: req.body.content,
      },
    };
    let result = await getArticlesCollection().updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating article");
  }
});

// This section will help you delete a article
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await getArticlesCollection().deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting article");
  }
});

export default router;