WP API OAuth Transport Example
===========
An example of a custom transport implementing oAuth 1.0a

Example
==============
```js
var endpointUrl = 'http://your-wp-url/wp-json';

var token = 'NsyVsTiOzf5iSMaiVIZJuWK6';
var tokenSecret = 'CuPEAHr8s6FtT3uSA0FMm6KwbCM4mVxNB5WiNFYnroYHW4jP';
var clientId = 'YYuwOqfPzRD4';
var clientSecret = 'j3OIa82xh3WelDKWJZWvMZfQJRuPConm7G5MSvwRhQGzF0SK';


// Require the custom oAuth tranport
var oauthTransport = require('./oauth-http-transport');

var WPAPI = require( 'wpapi' );
var wp = new WPAPI({
  endpoint: endpointUrl
});

// Create the transport
var transportObj = oauthTransport( wp.url, { clientId: clientId, clientSecret: clientSecret, accessToken:token, tokenSecret: tokenSecret } );

wp.transport( transportObj );

// Auth is required
wp.users().id(1).context('edit').auth(true).then(function(response,err) {
  console.log(response,err);
}).catch(function(err) {
  console.log("Error: ", err);
});
```
