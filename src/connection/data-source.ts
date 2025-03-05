import "reflect-metadata";
import { DataSource } from "typeorm";
import { Membership } from "../entities/membership";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password : "root",
    database: "ufcgymdata",
    entities: [Membership],
    synchronize: true,
    // logging: true,

  });