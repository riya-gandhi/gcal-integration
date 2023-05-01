const express = require("express");
const router = new express.Router();
const path = require("path");
const publicDicrectoryPath = path.join(__dirname, "../public");

router.get("/my-account", (req, res) => {
  res.sendFile(publicDicrectoryPath + "/my-google-events.html");
});

module.exports = router;
