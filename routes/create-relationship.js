const { Index } = require('faunadb');
const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');

const {Create, Select, Call,Function:Fn, Ref,Match, Now, Get,Collection} = faunadb.query;

module.exports = {

  async handler (request, reply) {

    const adventureId = request.params.adventureId;

    const client = new faunadb.Client({
        secret: process.env.FAUNA_SERVER_SECRET,
        domain: 'db.us.fauna.com'

    });

    const data = {
        follower:Call(Fn("getUser"),"sbrink"),
        followee:Call(Fn("getUser"),"fbrink"),
    }

    try {
     const result = await client.query(
            Create(
                Collection('relationships'),
                {data}
            )
        );

    reply.send(result);

    } catch (error) {
        console.log(error)
        throw new FaunaError(error);
    }
  }
};