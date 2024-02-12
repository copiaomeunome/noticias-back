import fastify from 'fastify'
import {z} from 'zod'
import {PrismaClient} from '@prisma/client'
import cors from '@fastify/cors'

const app = fastify()
const prisma = new PrismaClient();
app.register(cors, { 
    // put your options here
    origin: "*",
    methods:['GET','POST','DELETE']
})

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

app.delete<{Params:{id:string}}>('/excluir/:id',async (request,reply)=>{
    const id=parseInt(request.params.id)
    const noticiaDeletada= await prisma.noticias.delete({
        where:{
            id
        }
    })
    return reply.send(noticiaDeletada)
})


app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(()=>{console.log('server running')})