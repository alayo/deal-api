const axios = require("axios").default;



module.exports = {

  async handler (request, reply) {

    const options = {
      method: 'GET',
      url: 'https://realty-mole-property-api.p.rapidapi.com/properties',
      params: {address: '5500 Grand Lake Dr, San Antonio, TX, 78244'},
      headers: {
        'X-RapidAPI-Key': 'c45acbbe03msh7461d3ce6ec42d8p17a090jsn84d1ac3bdb89',
        'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

    
    reply.send(data)
      
  }
};