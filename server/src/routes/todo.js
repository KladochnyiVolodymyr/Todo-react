import express from "express";
import mongodb from "mongodb";
import paginate from "../middlewares/paginate";

const router = express.Router();

const validate = (data) => {
  const errors = {};

  if (!data.title) errors.title = "Title filed can't be blank";

  return errors;
};

router.get("/", paginate, async (req, res) => {
  const db = req.app.get("db");
  const { startIndex, limit } = res.locals;

  await db
    .collection("todo")
    .find({})
    .skip(startIndex)
    .limit(limit)
    .toArray((err, todo) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ pagination: res.pagination, todo });
    });
});

router.get("/:_id", (req, res) => {
  const db = req.app.get("db");
  db.collection("todo").findOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    (err, film) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ film });
    }
  );
});

router.post("/", (req, res) => {
  const db = req.app.get("db");
  const errors = validate(req.body.film);

  if (Object.keys(errors).length === 0) {
    db.collection("todo").insertOne(req.body.film, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ film: r.ops[0] });
    });
  } else {
    res.status(400).json({ errors });
  }
});

router.put("/featured/:_id", (req, res) => {
  const db = req.app.get("db");
  const { _id, ...filmData } = req.body.film;

  const errors = validate(filmData);

  if (Object.keys(errors).length === 0) {
    db.collection("todo").findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params._id) },
      { $set: filmData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        res.json({ film: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

router.put("/:_id", (req, res) => {
  const db = req.app.get("db");
  const { _id, ...filmData } = req.body.film;
  const errors = validate(filmData);

  if (Object.keys(errors).length === 0) {
    db.collection("todo").findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params._id) },
      { $set: filmData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        res.json({ film: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

router.delete("/:_id", (req, res) => {
  const db = req.app.get("db");

  db.collection("todo").deleteOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    (err) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({});
    }
  );
});

export default router;
