const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const Task = require('./models/task');

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/tasks', async (req, res) => {
  console.log('TRYING TO FETCH TASKs');
  try {
    const tasks = await Task.find();
    res.status(200).json({
      tasks: tasks.map((task) => ({
        id: task.id,
        text: task.text,
        // ADD MORE PROPERTIES - STATUS
      })),
    });
    console.log('FETCHED TASKS');
  } catch (err) {
    console.error('ERROR FETCHING task');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to load tasks.' });
  }
});

app.post('/tasks', async (req, res) => {
  console.log('TRYING TO STORE NEW TASK');
  const taskText = req.body.text;

  if (!taskText || taskText.trim().length === 0) {
    console.log('INVALID INPUT - NO TEXT');
    return res.status(422).json({ message: 'Invalid goal text.' });
  }

  const task = new Task({
    text: taskText,
  });

  try {
    await task.save();
    res
      .status(201)
      .json({ message: 'Task saved', task: { id: task.id, text: taskText } });
    console.log('STORED NEW TASK');
  } catch (err) {
    console.error('ERROR FETCHING TASKS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to save task.' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  console.log('TRYING TO DELETE TASK');
  try {
    await Task.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deleted task!' });
    console.log('DELETED TASK');
  } catch (err) {
    console.error('ERROR FETCHING TASKS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete task.' });
  }
});

mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-goals?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('FAILED TO CONNECT TO MONGODB');
      console.error(err);
    } else {
      console.log('CONNECTED TO MONGODB!!');
      app.listen(80);
    }
  }
);
