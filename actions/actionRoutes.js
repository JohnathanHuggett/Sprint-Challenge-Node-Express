const express = require("express");

const db = require("../data/helpers/actionModel.js");

const router = express.Router();

// ENDPOINTS FOR /api/actions

//GET REQUEST
router.get("/", (req, res) => {
  db
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({ error: "The actions could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: `The action at id: ${id} could not be retrieved` });
    });
});

// //GET POST

router.post("/", (req, res) => {
  const action = req.body;

  if (!action.project_id || !action.description) {
    res.status(400).json({
      errorMessage:
        "Please provide a action with a project id that matches existing project and description!",
    });
    return;
  }

  if (action.description.length > 128) {
    res.status(400).json({
      errorMessage:
        "Please provide a action description with less than 128 characters!",
    });
    return;
  }

  db
    .insert(action)
    .then(id => {
      res.status(201).json(action);
    })
    .catch(error => {
      res.status(500).json({ error: "The new action could not be created" });
    });
});

// //GET DELETE

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(action => {
      if (action > 0) {
        res.status(200).json({
          message: `Action ${id} has been deleted successfully!`,
        });
      } else {
        res.status(404).json({ error: `Action with ${id} not found` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The action could not be retrieved" });
    });
});

// //GET PUT

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedAction = req.body;

  db
    .update(id, updatedAction)
    .then(updates => {
      res.status(200).json({
        message: `Action ${id} has been updated successfully!`,
        updatedAction,
      });
    })
    .catch(error => {
      res.status(500).json({ error: "The action could not be updated" });
    });
});

module.exports = router;
