import fastify from "fastify";
import cors from '@fastify/cors'

import { userRoutes } from "./routes/user";

const app = fastify()

app.register(cors, {
  origin: true
})

app.register(userRoutes)

app
  .listen({ port: 3333 })
  .then(() => console.log('server running'))