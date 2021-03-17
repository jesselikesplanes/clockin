const createUnixSocketPool = async config => {
    const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';
  
    // Establish a connection to the database
    return await mysql.createPool({
      user: process.env.DB_USER, // e.g. 'my-db-user'
      password: process.env.DB_PASS, // e.g. 'my-db-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
      // If connecting via unix domain socket, specify the path
      socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
      // Specify additional properties here.
      ...config,
    });
  };

  try {
    const stmt = 'INSERT INTO votes (time_cast, candidate) VALUES (?, ?)';
    // Pool.query automatically checks out, uses, and releases a connection
    // back into the pool, ensuring it is always returned successfully.
    await pool.query(stmt, [timestamp, team]);
  } catch (err) {
    // If something goes wrong, handle the error in this section. This might
    // involve retrying or adjusting parameters depending on the situation.
    // ...
  }