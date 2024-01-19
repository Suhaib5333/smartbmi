const { Pool } = require('pg');

exports.handler = async function(event, context) {
  const pool = new Pool({
    connectionString: process.env.COCKROACHDB_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const result = await pool.query('SELECT * FROM Users');
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows)
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
