const { Index } = require('faunadb');
const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');

const {Create, Select, Call,Function:Fn, Ref,Match, Now, Get,Collection} = faunadb.query;

module.exports = {

  async handler (request, reply) {

    const dealId = request.body.dealId;

    const client = new faunadb.Client({
        secret: process.env.FAUNA_SERVER_SECRET,
        domain: 'db.us.fauna.com'

    });

    const data = {
        username:Call(Fn("getUser"),current.user),
        name:'',
        createdDate:Now(),
        address:'',
        units:'',
        rent:'',
        status:'',
        board:'',
        cap:'',
        debtType:'',
        debtService:'',
        occupancy:'',
        months:'',
        otherIncome:'',
        expenses:'',
    }

    try {
     const result = await client.query(
            Create(
                Collection('deals'),
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