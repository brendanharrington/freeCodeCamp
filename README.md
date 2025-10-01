# timestamp-microservice

A simple **Node.js + Express** app that returns Unix timestamps and UTC date strings for a given date. Similar to the [FreeCodeCamp Timestamp Microservice](https://timestamp-microservice.freecodecamp.rocks/).

## Features

- `GET /api/:date?` endpoint
  - Accepts date strings (`YYYY-MM-DD`) or Unix timestamps in milliseconds
  - Returns current time if no parameter is provided
- Returns:
  - `unix` → timestamp in milliseconds
  - `utc` → RFC 1123 date string
- Invalid dates return `{ "error": "Invalid Date" }`

## API Examples

- Current time: `/api`  
- Date string: `/api/2025-10-01` → `{ "unix": 1759276800000, "utc": "Wed, 01 Oct 2025 00:00:00 GMT" }`  
- Timestamp: `/api/1451001600000` → `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }`  
- Invalid date: `/api/not-a-date` → `{ "error": "Invalid Date" }`

## Tech Stack

- Node.js, Express  
- HTML, CSS (minimal frontend)

## License

MIT License  
**Author:** Brendan Harrington
