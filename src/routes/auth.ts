import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { compare } from "bcryptjs";

export async function authRoutes(app: FastifyInstance){
  app.post('/register', async (request, response) => {
    const userSchema = z.object({
      email: z.string(),
      password: z.string()
    })

    const userInfo = userSchema.parse(request.body)

    let user = await prisma.user.findUnique({
      where: {
        email: userInfo.email
      }
    })

    if(!user){
      return response.send({ message: "Usuário não encontrado..." })
    }

    const token = app.jwt.sign({
      id: user.id
    }, {
      expiresIn: '5 days'
    })

    return { token }

  })
}