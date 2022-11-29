const { Router} = require('express');
const { postFaq, getFaq, deleteFaq} = require('./controller');
const checkPermissions = require("../../permisos/permisosCheck");
const itemPermissos = require('../../permisos/permisos')
const route = Router();

route.get('/', getFaq)

route.post('/new', checkPermissions(itemPermissos.faq),postFaq);

route.get('/deleteFaq', checkPermissions(itemPermissos.faqDelete),deleteFaq)

module.exports = route;