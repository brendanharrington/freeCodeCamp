# exercise-tracker

This is a solution for the **Back End Development and APIs** curriculum project on [FreeCodeCamp](https://www.freecodecamp.org/).  
The project is built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.

## API Endpoints

### 1. Create a New User
**POST** `/api/users`  
- Request body: `username` (string)  
- Response:
```json
{
  "username": "johndoe",
  "_id": "652a7dc4f64be95cfa3d1234"
}
```

### 2. Get All Users
**GET** `/api/users`
- Response: Array of all users
```json
[
  {
    "username": "johndoe",
    "_id": "652a7dc4f64be95cfa3d1234"
  },
  {
    "username": "janedoe",
    "_id": "652a7dc4f64be95cfa3d5678"
  }
]
```

### 3. Add an Exercise

**POST** `/api/users/:_id/exercises`
- Request body:
  - `description` (string, required)
  - `duration` (number, required)
  - `date` (yyyy-mm-dd, optional)
- Response:
```json
{
  "_id": "652a7dc4f64be95cfa3d1234",
  "username": "johndoe",
  "date": "Wed Oct 01 2025",
  "duration": 30,
  "description": "run"
}
```

### 4. Get User's Exercise Log
**GET** `/api/users/:_id/logs?[from][&to][&limit]`
- Query parameters (optional):
  - `from` = date (yyyy-mm-dd)
  - `to` = date (yyyy-mm-dd)
  - `limit` = number
- Response:
```json
{
  "_id": "652a7dc4f64be95cfa3d1234",
  "username": "johndoe",
  "count": 2,
  "log": [
    {
      "description": "run",
      "duration": 30,
      "date": "Wed Oct 01 2025"
    },
    {
      "description": "bike",
      "duration": 45,
      "date": "Thu Oct 02 2025"
    }
  ]
}
```

## Technology Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Body-Parser
- CORS
- dotenv

## Author
Brendan Harrington

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
