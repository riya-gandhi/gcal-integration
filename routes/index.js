const express = require("express");
const router = new express.Router();
const path = require("path");
const publicDirectoryPath = path.join(__dirname, "../public");

router.get("/", (req, res) => {
  res.sendFile(publicDirectoryPath + "/my-google-events.html");
  // this renders html file on default route
});

module.exports = router;
