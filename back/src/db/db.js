import {Sequelize, DataTypes} from "sequelize";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname,"./../../");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: `${dbPath}/database.sqlite`
  });

async function authenticateConnection(){
    try {
        await sequelize.authenticate();
        console.log("connection established successfully!");
    } catch(error) {
        console.error("unable to connect to database", error);
    }
}

export {sequelize, authenticateConnection};
