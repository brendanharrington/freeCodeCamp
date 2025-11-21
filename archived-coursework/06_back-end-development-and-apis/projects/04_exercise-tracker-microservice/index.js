const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require("./models/User");
const Exercise = require("./models/Exercise");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/users', async function(req, res) {
  const { username } = req.body;
  
  // Check if user already exists in the database
  let existing = await User.findOne({ username });
  if (existing) {
    const { _id } = existing;
    return res.json({ username, _id });
  }

  const newUser = new User({ username });
  await newUser.save();

  res.json({ username, _id: newUser._id });
});

app.get('/api/users', async function(req, res) {
  const users = await User.find();
  res.json(users)
});

app.get('/api/users/:_id/logs', async function (req, res) {
  try {
    const userId = req.params._id;
    const { from, to, limit } = req.query;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    let filter = { userId };

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    let query = Exercise.find(filter).sort({ date: 1 }); 
    if (limit) query = query.limit(parseInt(limit));

    const exercises = await query.exec();

    const log = exercises.map(ex => ({
      description: ex.description,
      duration: ex.duration,
      date: ex.date.toDateString()
    }));

    res.json({
      _id: user._id,
      username: user.username,
      count: log.length,
      log
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.post('/api/users/:_id/exercises', async function(req, res) {
  const { description, duration, date } = req.body;
  const userId = req.params._id;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const exercise = new Exercise({
      userId: user._id,
      description,
      duration: parseInt(duration),
      date: date ? new Date(date) : new Date()
    });

    const savedExercise = await exercise.save();

    res.json({
      _id: user._id,
      username: user.username,
      date: savedExercise.date.toDateString(),  
      duration: savedExercise.duration,
      description: savedExercise.description
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}) ;


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
