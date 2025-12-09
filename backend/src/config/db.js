const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "km_dev",               // Database name
  process.env.DATABASE_USER,      // From Kubernetes secret
  process.env.DATABASE_PASSWORD,  // From Kubernetes secret
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: 3306,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log(`Database connected successfully with SSL!`);
    return sequelize;
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

module.exports = initializeDatabase;
