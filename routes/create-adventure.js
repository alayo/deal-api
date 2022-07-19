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
        username:Call(Fn("getUser"),current.user),
        name:'new adventure',
        createdDate:Now(),
        visible:'public',
        waterType:'river',
        lodging:{type:'hotel',location:'',state:'',city:''},
        flight:'none',
        guides:'none',
        guest:'none',
        startDate:Now(),
        endDate:Now(),
        cars:'none',
        gear:'none',
        notes:'',
        state:'',
        city:'',
        status:'active',
        boat:'none',
        trax:false
    }

    try {
     const result = await client.query(
            Create(
                Collection('adventures'),
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