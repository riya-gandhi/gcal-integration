const { google } = require("googleapis");
const { authorize } = require("../middleware/AuthGCalender");

class GCalender {
  async listEvents() {
    try {
      const auth = await authorize();
      const calendar = google.calendar({ version: "v3", auth });
      const res = await calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 100,
        singleEvents: true,
        orderBy: "startTime",
      });
      const events = res.data.items;
      if (!events || events.length === 0) {
        console.log("No upcoming events found.");
        return;
      }
      console.log("Upcoming 10 events:");
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } catch (error) {
      throw error;
    }
  }

  async createEvent(event) {
    try {
      const auth = await authorize();
      const calendar = google.calendar({ version: "v3", auth });

      calendar.events.insert(
        {
          auth: auth,
          calendarId: "primary",
          resource: event,
        },
        function (err, event) {
          if (err) {
            console.log(
              "There was an error contacting the Calendar service: " + err
            );
            return;
          }
          console.log("Event created: %s", event.htmlLink);
          return event;
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GCalender;
