const express = require('express');

// Constants
const port = 3000;
const app = express();


// App
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.get('/users', (req, res) => {
  // Logic to fetch all users from database
  const users = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' }
  ];
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  // Logic to fetch a user with specific ID from database
  const user = { id: req.params.id, name: 'John Doe', email: 'johndoe@example.com' };
  res.json(user);
});

app.post('/users', (req, res) => {
  // Logic to create a new user in the database
  const user = { name: req.body.name, email: req.body.email };
  res.json(user);
});

app.put('/users/:id', (req, res) => {
  // Logic to update a user with specific ID in the database
  const user = { id: req.params.id, name: req.body.name, email: req.body.email };
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  // Logic to delete a user with specific ID from the database
  res.send(`User with ID ${req.params.id} deleted successfully`);
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
