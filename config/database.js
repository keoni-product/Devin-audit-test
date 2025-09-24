/**
 * Database configuration for future database integration
 */

const config = {
  development: {
    host: 'localhost',
    port: 5432,
    database: 'devin_audit_dev',
    username: 'postgres',
    password: 'password'
  },
  test: {
    host: 'localhost',
    port: 5432,
    database: 'devin_audit_test',
    username: 'postgres',
    password: 'password'
  },
  production: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
