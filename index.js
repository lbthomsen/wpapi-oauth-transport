var endpointUrl = 'http://sample.url/wp-json';

var token = 'bCM4mVxNB5WiNFYnroYHSA';
var tokenSecret = 'CuriVIZJuWK60FMm6KwW4jP';
var clientId = 'elfQJRf4WJZWvMZjSvwR';
var clientSecret = 'uPConm7G5MDKPzRDY2xh3WhYuwOq3OIa8QGzF0SK';


// Option 1: Create a new http-transport

var oauthTransport = require('./oauth-http-transport');

var WPAPI = require( 'wpapi' );
var wp = new WPAPI({
  endpoint: endpointUrl
});

wp.transport( oauthTransport(wp.url, { clientId: clientId, clientSecret: clientSecret, accessToken:token, tokenSecret: tokenSecret } ));

var oauth = require('oauth');


wp.users().context('edit').id(1).auth(true).then(function(response,err) {
  console.log(response,err);
}).catch(function(err) {
  console.log("Error: ", err);
});
