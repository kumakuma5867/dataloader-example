import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { Container } from "typeorm-typedi-extensions";

useContainer(Container);

const bootstrap = async () => {
  createConnection()
    .then(async (connection) => {
      const schema = await buildSchema({
        resolvers: [__dirname + "/resolver/*.{ts,js}"],
        container: Container,
      });

      const server = new ApolloServer({
        schema,
        playground: true,
      });
      const { url } = await server.listen(4000);
      console.log(`Server ready at ${url}`);
    })
    .catch((error) => console.error(error));
};

bootstrap();
