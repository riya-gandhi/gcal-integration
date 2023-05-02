const express = require("express");
const router = new express.Router();
const gCalender = require("../helpers/GCalenderHelper");

router.get("/", async (req, res) => {
  try {
    const gcal = new gCalender();
    const gEvents = await gcal.listEvents();
    res.status(200).send(successResponse(req.originalUrl, "Success!", gEvents));
  } catch (error) {
    res.status(400).send(failureResponse(error, req.originalUrl));
  }
});

router.post("/create-event", async (req, res) => {
  try {
    const { eventDetails } = req.body;
    const gcal = new gCalender();
    await gcal.createEvent(eventDetails);
    res.status(200).send(successResponse(req.originalUrl, "Success!"));
  } catch (error) {
    res.status(400).send(failureResponse(error, req.originalUrl));
  }
});

module.exports = router;
