const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');

const {Get, Ref, Collection} = faunadb.query;

module.exports = {

  async handler (request, reply) {

    const adventureId = request.params.adventureId;

    const client = new faunadb.Client({
        secret: process.env.FAUNA_SERVER_SECRET,
        domain: 'db.us.fauna.com'

    });

  

    try {
     const result = await client.query(
            Get(
                Ref(
                    Collection('locations'),
                    request.params.adventureId
                )
            )
        );

    reply.send(result);

    } catch (error) {
        console.log(error)
        throw new FaunaError(error);
    }
  }
};