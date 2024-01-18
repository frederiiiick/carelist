import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './Schema'
import cors from 'cors'
import { DataSource } from 'typeorm'
import { Users } from './Schema/Entities/Users'
import { Tasks } from './Schema/Entities/Tasks'


const main =async () => {
    const AppDataSource  = new DataSource({
        type: 'mysql',
        host: 'mysqldb',
        database: 'tasklist',
        username: 'root',
        password: 'password',
        logging: true,
        synchronize: true,
        entities: [Users, Tasks],
    });

    await AppDataSource.initialize();

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true,
    }))

    app.listen(3001, () =>  {
        console.log('SEREVER RUNNING ON http://localhost:3001/')
    })
};

main().catch((error) => {
    console.log(error)
});