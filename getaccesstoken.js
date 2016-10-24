
var opn = require( 'opn' );
var prompt = require('prompt');

var OAuth = require( 'oauth' );
var oauth = new OAuth.OAuth(
    // reqURL
    'http://hotsource.io/oauth1/request',
    // accessURL
    'http://hotsource.io/oauth1/access',
    // Key
    'PzRDYYuwOqf4',
    // Secret
    'uPConm7G5MDKWJZWvMZj3OIa82xh3WelfQJRSvwRhQGzF0SK',
    // Version
    '1.0A',
    // authorize_callback (null in example)
    'oob',
    // Signature method
    'HMAC-SHA1'
    // nonceSize
    // customHeaders
);

// console.log( auth );

function getRequestToken() {
    return new Promise( ( resolve, reject ) => {
        oauth.getOAuthRequestToken(function( err, token, secret, results ) {
            if ( err ) {
                return reject( err );
            }
            console.log( results );
            resolve({
                token: token,
                secret: secret
            });
        });
    });
}
function getAccessToken(config) {
    return new Promise( ( resolve, reject ) => {
        oauth.getOAuthAccessToken( config.token, config.secret, config.verifier, function( err, token, secret, results ) {
            if ( err ) {
                return reject( err );
            }
            resolve({
                token: token,
                secret: secret
            });
        });
    });
}

getRequestToken()
    .then(function(config) {
        opn(`http://hotsource.io/oauth1/authorize?oauth_token=${config.token}&oauth_callback=oob`);
        prompt.start();
        return new Promise( ( resolve, reject ) => {
            prompt.get([
                'verifier'
            ], ( err, result ) => {
                if ( err ) {
                    return reject( err );
                }
                resolve({
                    token: config.token,
                    secret: config.secret,
                    verifier: result.verifier
                });
            });
        });
    })
    .then(function( config ) {
        console.log( config );
        return getAccessToken( config );
    })
    .then(function( result ) {
        console.log( result );
    })
    .catch( err => console.error( err ) );
