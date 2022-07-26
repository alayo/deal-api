const { Index } = require('faunadb');
const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');

const {Create, Select, Call,Function:Fn, Ref,Match, Now, Get,Collection} = faunadb.query;

module.exports = {

  async handler (request, reply) {

    console.log(request.body)

    const client = new faunadb.Client({
        secret: process.env.FAUNA_SERVER_SECRET,
        domain: 'db.us.fauna.com'

    });
    let data = request.body;
    data.username=Call(Fn("getUser"),"sbrink");
    
    console.log(data)

    try {
     const result = await client.query(
            Create(
                Collection('markets'),
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