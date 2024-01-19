const { Pool } = require('pg');

exports.handler = async function(event, context) {
  const pool = new Pool({
    connectionString: process.env.COCKROACHDB_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  });

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const result = await pool.query('INSERT INTO Users (name, bmi, status) VALUES ($1, $2, $3)', [data.name, data.bmi, data.status]);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data saved successfully' })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
