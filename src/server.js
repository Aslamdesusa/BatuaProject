import Hapi from 'hapi';
import firebase from 'firebase';
// const Hapi = require('hapi');
var db = require('firebase')
import Inert from 'inert';
import Vision from 'vision';
import routes from './routes'

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 8000
});


server.register([
    Inert,
    Vision,
    {
        register:require('hapi-swagger')
    }],
    function(err){
    if(err){
        server.log(['error'], 'hapi-swagger load error: ' + err)
    }
    else{
    }
        server.log(['start'], "hapi-swagger interface loaded!")
});



firebase.initializeApp({
  serviceAccount: "../batua-65719-firebase-adminsdk-4pmam-95a219eaf0.json",
  databaseURL: "https://batua-65719.firebaseio.com"
});



 


server.route(routes)

server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

});
