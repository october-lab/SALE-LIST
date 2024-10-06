import { Sequelize } from 'sequelize';

// Connect to SQLite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '/Users/divya/Documents/code/Projects/MERN_CRUD_template-main/server/database.sqlite',
    dialectOptions: {
        connectTimeout: 60000 // milliseconds (1 minute)
    }
});

// Export the Sequelize instance
export default sequelize