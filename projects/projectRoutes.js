const express = require("express");

const db = require("../data/helpers/projectModel.js");

const router = express.Router();

// ENDPOINTS FOR /api/projects

//GET REQUEST
router.get("/", (req, res) => {
  db
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ error: "The projects could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: `The project at id: ${id} could not be retrieved` });
    });
});

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;

  db
    .getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The projects actions could not be retrieved" });
    });
});

//GET POST

router.post("/", (req, res) => {
  const project = req.body;

  if (!project.name || !project.description) {
    res.status(400).json({
      errorMessage: "Please provide a project with a name and description!",
    });
    return;
  }

  if (project.name.length > 128 || project.description.length > 128) {
    res.status(400).json({
      errorMessage:
        "Please provide a project with a name and description with less than 128 characters!",
    });
    return;
  }

  db
    .insert(project)
    .then(id => {
      res.status(201).json(project);
    })
    .catch(error => {
      res.status(500).json({ error: "The new project could not be created" });
    });
});

//GET DELETE

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(project => {
      if (project > 0) {
        res.status(200).json({
          message: `Project ${id} has been deleted successfully!`,
        });
      } else {
        res.status(404).json({ error: `Project with ${id} not found` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The project could not be retrieved" });
    });
});

//GET PUT

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedProject = req.body;

  db
    .update(id, updatedProject)
    .then(updates => {
      res.status(200).json({
        message: `Project ${id} has been updated successfully!`,
        updatedProject,
      });
    })
    .catch(error => {
      res.status(500).json({ error: "The project could not be updated" });
    });
});

module.exports = router;
