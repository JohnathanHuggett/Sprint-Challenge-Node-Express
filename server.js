const express = require("express");

const projectRoutes = require("./projects/projectRoutes.js");
const actionRoutes = require("./actions/actionRoutes.js");

const server = express();

server.use(express.json());
server.use("/api/projects", projectRoutes);
server.use("/api/actions", actionRoutes);

const port = 5000;

server.listen(port, () => {
  console.log("Server running on port 5000!");
});
