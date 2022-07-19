async function userRoute(fastify, options) {
    fastify.get('/users/:id', async (req, reply) => {
      const { id } = req.params;
      const user = await fastify.firebase['client2']
        .firestore()
        .collection('users')
        .get(id)
        .get();
  
      if (!user.exists) {
        return reply.notFound();
      }
  
      return user.data();
    });
  }