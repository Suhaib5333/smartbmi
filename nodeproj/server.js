const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgresql://suhaib:OE3TnUbKFwlqgzG7w7HqWQ@lumpy-pelican-13055.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full',
    ssl: {
      rejectUnauthorized: false
    }
  });
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      console.log('Connection successful. Current time:', res.rows[0]);
    }
  });
  const express = require('express');
  const cors = require('cors');
  const app = express();
const port = 3001; // or any other available port

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// Get all data
app.get('/data', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Users');
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).send('Error fetching data');
    }
  });
  
  // Add more endpoints for other operations like POST, PUT, DELETE as needed.
  