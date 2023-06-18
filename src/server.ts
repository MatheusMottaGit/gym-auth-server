import jwt from "@fastify/jwt";
import cors from '@fastify/cors'
import fastify from "fastify";

import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";

const app = fastify()

app.register(cors, {
  origin: true
})

app.register(jwt, {
  secret: 'hsqjfwdwwixnprqhj'
})

app.register(userRoutes)
app.register(authRoutes)

app
  .listen({ port: 3333 })
  .then(() => console.log('server running'))