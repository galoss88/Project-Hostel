const { Client, Countrie } = require('../../db')
const axios = require('axios');

async function getClient(req, res) {     
    try {
      const accesToken = req.headers.authorization.split(' ')[1];
      const responds = await axios.get('https://dev-o7k6sbvjre41wvzb.us.auth0.com/userinfo', {
         headers:{
           authorization:`Bearer ${accesToken}`
         }
      })
        const userinfo = responds.data;
        const { sub } = userinfo;
        const id = sub.split('|')[1];
        const data = await Client.findOne(
          {where:{ idAuth: id },include:{
            model: Countrie,
            attributes:['country'],
            trought:{attributes:[]}
          }})
      if (data.length == 0) return res.send('empty db')
         res.json({
          personalID : data.personalID,
          name:data.name,
          lastname:data.lastname,
          nationality:data.nationality,
          phoneNumber:data.phoneNumber,
          email:data.email,
          observation:data.observation,
          countrieId:data.countrieId,
          country:data.countrie? data.countrie.country : "Argentina",
          id: data.id,
          status:data.status
        });
       } catch (error) {
         res.json({error: error + ""})
       } 
 }

module.exports =  {
    getClient
};