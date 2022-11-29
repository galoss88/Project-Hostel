// const jwtAuthz = require("express-jwt-authz");
const jwtAuthz = require("express-jwt-authz");

module.exports =
 checkPermissions = (permissions) => {
  return jwtAuthz([permissions], {
    customScopeKey: "permissions",
    checkAllScopes: true,
    customUserKey: 'auth' ,
    failWithError: true
  });
};