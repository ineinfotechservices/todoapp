const express = require('express');
const app = express();
const port = 3000;

let tasks = [];

app.use(express.json());

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id == id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});