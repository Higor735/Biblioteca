import "reflect-metadata"
import { DataSource } from "typeorm"

import Livro from "../entities/Livro"
import Auditorio from "../entities/Auditorio"
import Leitor from "../entities/Leitor"
import Autor from "../entities/Autor"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "PostgreSQL 17",
    port: 3333,
    username: "PostgreSQL 17",
    password: "1234567",
    database: "Biblioteca",
    synchronize: true,
    logging: true,
    entities: [Livro, Auditorio, Leitor, Autor],
    migrations: ["src/database/migrations/*.ts"]

})
// Iniciar a conexão com o banco de dados
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((error) => {
        console.error("Error during Data Source initialization", error)
})
