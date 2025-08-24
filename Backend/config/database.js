const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || '127.0.0.1', 
    dialect: 'mysql',
    logging: console.log, 
    timezone: '+07:00',
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Database connected (development)');
  } catch (error) {
    console.error('❌ Unable to connect to MySQL:', error.message);
  }
};

testConnection();

module.exports = sequelize;
