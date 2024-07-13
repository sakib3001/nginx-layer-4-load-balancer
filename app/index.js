const express = require('express');
const { v4: uuidv4 } = require('uuid');  // Add uuid package for generating unique IDs

const app = express();

// Generate a dynamic server ID
const serverId = uuidv4();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`Server ID: ${serverId}, running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server ID: ${serverId} listening on port ${port}`);
});
