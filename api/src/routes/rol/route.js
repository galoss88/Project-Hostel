const { Router} = require('express');
const { getRol } = require('./controller');

const route = Router();

route.get("/", getRol);


module.exports = route;