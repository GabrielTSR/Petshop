import { DataSource } from 'typeorm';

//This class represents the connection to the entire database
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'bcd127',
    database: 'db_petshop',
    synchronize: true,
    logging: false,
    entities: ['src/app/entity/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
});
