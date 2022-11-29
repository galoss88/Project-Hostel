const axios = require('axios');


async function getRol(req, res){
    try {
     const accesToken = req.headers.authorization.split(' ')[1];
     const responds = await axios.get('https://dev-o7k6sbvjre41wvzb.us.auth0.com/userinfo', {
        headers:{authorization:`Bearer ${accesToken}`}
      })

      const userinfo = responds.data;
      res.json({rol:userinfo.rol });
    } catch (error) {
     console.log(error);
    }
 }

 module.exports = {
    getRol
 }