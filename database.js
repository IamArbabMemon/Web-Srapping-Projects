const mysql = require('mysql2/promise');
// const dotenv = require("dotenv");

// dotenv.config();

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });





async function insertData(dataArray) {
  // Create a connection pool
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'arbab123',
    database: 'shop'
  });

  try {

    const connection = await pool.getConnection();
    
    // Your data to be inserted
    // Insert query using async/await
    for(let obj of dataArray)
    await connection.query('INSERT INTO products SET ?', obj);
    

    connection.release();
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Close the connection pool
    pool.end();
  }
}


module.exports = {
  insertData
}


