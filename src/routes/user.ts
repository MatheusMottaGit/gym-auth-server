import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { hash } from "bcryptjs";

export async function userRoutes(app: FastifyInstance){
  app.post('/user', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      phone_number: z.string()
    })

    const { email, name, password, phone_number } = bodySchema.parse(request.body)

    const cryptoPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email, 
        password: cryptoPassword,
        phone_number
      }
    })

    return user
  })
} 