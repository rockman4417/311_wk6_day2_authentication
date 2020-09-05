require('dotenv').config()
const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');

const logger = (req, res, next) => {
  console.log('!*****! REQUEST: !*****!', req.path, new Date().toISOString())
  next()
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://hipperger.us.auth0.com/.well-known/jwks.json'
  }),
  // Validate the audience and the issuer.
  audience: 'my-express-app',
  issuer: 'https://hipperger.us.auth0.com/',
  algorithms: ['RS256']
});

module.exports = {
  logger,
  checkJwt
}