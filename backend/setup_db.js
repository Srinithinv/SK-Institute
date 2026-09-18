require('dotenv').config();
const { Client } = require('pg');

async function createDatabase() {
  const client = new Client({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: 'postgres', // Connect to default database
  });

  try {
    await client.connect();
    console.log('Connected to default postgres database...');
    
    // Check if database exists
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'skinstitute'");
    if (res.rowCount === 0) {
      await client.query('CREATE DATABASE skinstitute');
      console.log('Database "skinstitute" created successfully!');
    } else {
      console.log('Database "skinstitute" already exists.');
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDatabase();
