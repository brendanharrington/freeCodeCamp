// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/**
 * Timestamp API
 * - /api/:date?
 *   - If :date is absent -> return current time
 *   - If :date is numeric-only -> treat as milliseconds timestamp
 *   - Else -> pass the string to new Date()
 * - Response:
 *   - Valid: { unix: <Number ms>, utc: "<RFC1123 string>" }
 *   - Invalid: { error: "Invalid Date" }
 */
app.get("/api/:date?", (req, res) => {
  const { date: dateParam } = req.params;

  let dateObj;

  if (!dateParam) {
    // no param -> current date/time
    dateObj = new Date();
  } else {
    // Check if the param is all digits (timestamp in milliseconds)
    // Accept negative timestamps too (Unix epoch before 1970).
    if (/^-?\d+$/.test(dateParam)) {
      // Convert numeric string to number and create Date from milliseconds
      const ms = Number(dateParam);
      dateObj = new Date(ms);
    } else {
      // Otherwise pass the string directly to Date
      dateObj = new Date(dateParam);
    }
  }

  // Validate
  if (isNaN(dateObj.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
