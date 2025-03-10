import "reflect-metadata";
import { DataSource } from "typeorm";
import { Membership } from "../entities/membership";

export const AppDataSource = new DataSource({
  type: "mariadb", // Change from "postgres" to "mariadb"
  host: "localhost", // Keep as localhost or update to the MariaDB server host
  port: 3307, // Change from 5432 (PostgreSQL) to 3307 (MariaDB)
  username: "new_user", // Replace with your newly created MariaDB user
  password: "password", // Replace with the password for the new user
  database: "testdb", // Replace with your MariaDB database name
  entities: [Membership], // Keep your entities
  synchronize: true, // Keep synchronize as needed
  // logging: true, // Uncomment if you want to enable logging
});