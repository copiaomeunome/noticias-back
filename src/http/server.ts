import fastify from 'fastify'
import {z} from 'zod'
import {PrismaClient} from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient();

app.get('/listar',async ()=>{
    const noticias = await prisma.noticias.findMany()
    return noticias
})

app.post('/criar',async (request,reply)=>{
    //validação
    const noticiaSchema = z.object({
        titulo: z.string(),
        descricao: z.string()
    })
    const {titulo, descricao} = noticiaSchema.parse(request.body)
    
    //criação
    await prisma.noticias.create({
        data:{
            titulo,
            descricao
        }
    })
    return reply.status(201).send()
})


app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(()=>{console.log('server running')})