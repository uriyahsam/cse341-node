const express = require('express');
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Connected to MongoDB. Server running on port ${port}`);
    });
  }
});