const Fastify = require('fastify');
const prisma = require('@prisma/client').PrismaClient;
const TransactionRoutes = require('./routes/transaction');

const app = Fastify();
const db = new prisma();

app.register(require('@fastify/jwt'), { secret: 'transaction' });

app.decorate('authentication', async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

app.register(TransactionRoutes, { prefix: '/transaction', db });

app.listen({ port: 3004 }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server listening on http://localhost:3001');
});
