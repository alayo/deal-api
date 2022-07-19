const axios = require("axios").default;



module.exports = {

  async handler (request, reply) {

    let options = {
        method: 'GET',
        url: 'https://visual-crossing-weather.p.rapidapi.com/history',
        params: {
          startDateTime: '2019-01-01T00:00:00',
          aggregateHours: '24',
          location: 'Washington,DC,USA',
          endDateTime: '2019-01-03T00:00:00',
          unitGroup: 'us',
          dayStartTime: '8:00:00',
          contentType: 'csv',
          dayEndTime: '17:00:00',
          shortColumnNames: '0'
        },
        headers: {
          'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com',
          'x-rapidapi-key': 'f0f312903bmsh9964949f88f25f8p15fdb9jsn0cebcd361c05'
        }
      };

      let data;
      axios.request(options).then(function (resp) {
        data= resp.data;
    }).catch(function (error) {
        console.error(error);
    });

    
    reply.send(data)
      
  }
};