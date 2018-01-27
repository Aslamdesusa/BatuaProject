import Hapi from 'hapi';
import firebase from 'firebase';
// const Hapi = require('hapi');
var db = require('firebase')
import routes from './routes'

// var admin = require("firebase-admin");


// var db = admin.database();


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 8000
});
// var admin = require("firebase-admin");

// var serviceAccount = require("../batua-65719-firebase-adminsdk-4pmam-95a219eaf0.json");

firebase.initializeApp({
  serviceAccount: "../batua-65719-firebase-adminsdk-4pmam-95a219eaf0.json",
  databaseURL: "https://batua-65719.firebaseio.com"
});



 // firebase.database().ref('/IssuerList/' + promoId).once('value').then(function (snapshot) {
 //            promo_data = snapshot.val();
 //            if (promo_data != null) {
 //                var refss = firebase.database().ref('/promotions/v1/' + site + '/'+ promoId + '/');
 //                // First null the prority of apply node then update name.
 //                firebase.database().ref('/promotions/v1/' + site + '/'+ promoId + '/'+'apply/').setPriority(null);
 //                refss.update({'name': promoRuleName});
 //            }

 //        });








// var ref = firebase.database("server/saving-data/fireblog");
// var UsersRef = ref.child("Users");
// UsersRef.set({
//   alanisawesome: {
//     date_of_birth: "June 23, 1912",
//     full_name: "Alan Turing"
//   },
//   gracehop: {
//     date_of_birth: "December 9, 1906",
//     full_name: "Grace Hopper"
//   }
// });

// var ref = firebase.database("Users").doc('-L2Q4fKeYGzyYRmUZXei').delete();
// var ref = firebase.database('Users').doc('-L2Q4fKeYGzyYRmUZXei').delete();
// doc kk ander jo value hia wo kon si value hoti hia datatbase mei
// console.log(deleteDoc)


// router.get('/Users', function(req, res, next) {
//   var key = req.query.item;
//   let del_ref = admin.database().ref("Users/" + key);
//   del_ref.remove()
//     .then(function() {
//       res.send({ status: 'ok' });
//     })
//     .catch(function(error) {
//       console.log('Error deleting data:', error);
//       res.send({ status: 'error', error: error });
//     });
// });

// var usersRef = ref.child("-L2Q4fKeYGzyYRmUZXei");
// // var batua-65719Ref = usersRef.child("-L2--B_iFkNoTIiIk67A");
// batua-65719Ref.update({
//   "issuerid": "Amazing Grace"
// });




// UsersRef.child("alanisawesome").set({
//   date_of_birth: "June 23, 1912",
//   full_name: "Alan Turing"
// });
// UsersRef.child("gracehop").set({
//   date_of_birth: "December 9, 1906",
//   full_name: "Grace Hopper"
// });


// console.log(firebase);
// console.log(firebaseio);

// var ref = firebase.database().ref('Users');
// // var IssuerListRef = ref.child('airtel_02');
// ref.push({
// 	age: age,
// 	gender: gender,
// 	name: gender,
// 	password:,
// 	username: 'amol'
// });


// var ref = firebase.database().ref('/h');
// var IssuerListRef = ref.child('airtel_02');
// var IssuerListRef1 = IssuerListRef.push();
// var IssuerListRef1 = IssuerListRef.push({
// 		issuerid: 'r',
// 		issuername: 'Idea',
// 		issuertype: 'Payment Bank',
// 		issuerwebsite: 'www.airtel.in/bank',
// 		paymentnetworksupported: 'Visa,Mastercard',
// 		paymentoptionids: 'airtel_01_pay_01,airtel_01_pay_02',
// 		paymentoptiontypessupported: 'Creditcard'
// })







server.route(routes)

server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

});
