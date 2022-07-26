const fastify = require('fastify')({ logger: true });
const jwt = require('fastify-jwt');

const fastifyGuard = require('fastify-guard')

const FaunaError = require('./errors/FaunaError.js');
fastify.register(jwt, {
  secret: async function (request, token) {
    return 'ejYQ14VPWhJtj6dRWjiYAhoJ5bbzEPRUkuzpBJeZ5tifTd0Pzj4RaQw0gi'
  }
})


fastify.post('/api/register', async function (request, reply) {
  console.log(request.body)
  const token = await reply.jwtSign(request.body)
  console.log(token)
  return reply.send({ token })
})

fastify.get('/api/users/:userId', require('./routes/get-user.js'));
fastify.get('/api/deals/:dealId', require('./routes/get-deals.js'));
fastify.post('/api/quick-deal/', require('./routes/create-quick-deal.js'));
fastify.post('/api/relationship/', require('./routes/create-relationship.js'));
fastify.post('/api/locations', require('./routes/create-markets.js'));




async function start () {
  try {
    await fastify.listen(8000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1);
  }
};

start();