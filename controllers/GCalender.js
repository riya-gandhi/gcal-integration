const express = require("express");
const router = new express.Router();
const gCalender = require("../helpers/GCalenderHelper");

router.get("/", async (req, res) => {
  try {
    const gcal = new gCalender();
    const gEvents = await gcal.listEvents();

    // save gEvents in database using accessor [insert on duplicate key update query]
    // https://developers.google.com/calendar/api/guides/sync

    // can use cron job to reflect new or updated events in our database
    // or can use webhook for 2-way sync of google events and events in our database

    res.status(200).send(successResponse(req.originalUrl, "Success!", gEvents));
  } catch (error) {
    res.status(400).send(failureResponse(error, req.originalUrl));
  }
});

router.post("/create-event", async (req, res) => {
  try {
    const { eventDetails } = req.body;
    const gcal = new gCalender();

    // create event on google calender

    const newEvent = await gcal.createEvent(eventDetails);
    res
      .status(200)
      .send(successResponse(req.originalUrl, "Success!", newEvent));
  } catch (error) {
    res.status(400).send(failureResponse(error, req.originalUrl));
  }
});

module.exports = router;
