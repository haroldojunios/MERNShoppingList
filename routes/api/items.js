const express = require("express");

const router = express.Router();

const Item = require("../../models/Item");
const auth = require("../../middleware/auth");

router
  .route("/")
  // @route   GET api/items
  // @desc    Get all items
  // @access  Public
  .get((req, res) => {
    Item.find()
      .sort({ date: -1 })
      .then(items => res.json(items));
  })
  // @route   POST api/items
  // @desc    Create new item
  // @access  Private
  .post(auth, (req, res) => {
    const newItem = new Item({
      name: req.body.name,
    });

    newItem.save().then(item => res.json(item));
  });

router
  .route("/:id")
  // @route   POST api/items
  // @desc    Delete item
  // @access  Private
  .delete(auth, (req, res) => {
    Item.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  });

module.exports = router;
