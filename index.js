const fastify = require('fastify')({ logger: true });
const jwt = require('fastify-jwt');

const fastifyGuard = require('fastify-guard')

const FaunaError = require('./errors/FaunaError.js');
fastify.register(jwt, {
  secret: async function (request, token) {
    return 'supersecret'
  }
})


fastify.post('/api/register', async function (request, reply) {
  console.log(request.body)
  const token = await reply.jwtSign(request.body)
  console.log(token)
  return reply.send({ token })
})

fastify.get('/users/:userId', require('./routes/get-user.js'));
fastify.get('/adventure/:adventureId', require('./routes/get-adventures.js'));
fastify.post('/adventure/', require('./routes/create-adventure.js'));
fastify.post('/relationship/', require('./routes/create-relationship.js'));
fastify.post('/api/locations', require('./routes/create-locations.js'));




async function start () {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1);
  }
};

start();