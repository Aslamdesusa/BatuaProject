var admin = require("firebase-admin");
var firebase = require("firebase")
var request1 = require('request');
var config = require('config')
var ref1 = require('ref')
// var IssuerList = require("")
// var db = require('firebase')
var widgets = require("widgets")
var Joi = require('joi');
// var config = require('nodejs-config')(
//    __dirname  // an absolute path to your applications `config` directory 
// );

// getting authentiction with signInWithEmailAndPassword when user sign in the app @

// var firebaseClient = require('firebase');
// firebaseClient.initializeApp(config)
// firebaseClient.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error){
//     console.log(error);
// })



const routes = [
	{	
		method: 'GET',
		path: '/check',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting auth of a particular user",
            notes:"In this route we are Getting auth of particular user"
		},
		handler: function(request, reply){
			var user = firebaseClient.auth().currentUser
			console.log(user)
		}
	},
	{
		method: 'GET',
		path: '/get/IssuerList/{issuer?}',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting details of a particular Issuer",
            notes:"In this route we are Getting details of particular issuer where you have to make a request in params by issuerName"
            // validate: {
            // 	params:{

            // 	}
            // }
		},
		handler: function( request, reply ){
			// console.log(firebase-admin)

			var issuer = request.params.issuer;

 			var ref = firebase.database().ref(`/IssuerList/${issuer}`)
			// var IssuerListRef = ref.child('airtel_02');
			ref.orderByChild('issuername').on("value", function(snapshot) {
			reply({
				statusCode: 200,
				message: 'IssuerList successfully get',			
				data: snapshot
			});
			  // console.log(snapshot.val());
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'GET',
		path: '/get/all/IssuerList',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting all IssuerList",
            notes:"In this route we are Getting all details of IssuerList"
		},
		handler: function( request, reply ){
			// console.log(firebase-admin)
			
			var ref = firebase.database().ref('IssuerList')
			// var IssuerListRef = ref.child('airtel_02');
			// ref.orderByChild('categorynames').on("value", function(snapshot) {
			ref.orderByChild('IssuerList').on("value", function(snapshot) {
				
					reply({
						statusCode: 200,
						message: 'IssuerList successfully get',			
						data: snapshot
					});
			  // console.log(snapshot.val());
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'GET',
		path: '/get/all/MerchantList',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting all MerchantList",
            notes:"In this route we are Getting all details of MerchantList"
		},
		handler: function( request, reply ){
			// console.log(firebase-admin)
			
			var ref = firebase.database().ref('MerchantList')
			// var IssuerListRef = ref.child('airtel_02');
			ref.orderByChild('Category_Names').on("value", function(snapshot) {
				
					reply({
						statusCode: 200,
						message: 'MerchantList successfully get',			
						data: snapshot
					});
			  // console.log(snapshot.val());
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'GET',
		path: '/get/all/OfferList',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting all OfferList",
            notes:"In this route we are Getting all details of OfferList"
		},
		handler: function( request, reply ){
			// console.log(firebase-admin)
			
			var ref = firebase.database().ref('OfferList')
			// var IssuerListRef = ref.child('airtel_02');
			ref.orderByChild('categorynames').on("value", function(snapshot) {
				
					reply({
						statusCode: 200,
						message: 'OfferList successfully get',			
						data: snapshot
					});
			  // console.log(snapshot.val());
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'GET',
		path: '/get/all/PaymentOptionList',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting all PaymentOptionList",
            notes:"In this route we are Getting all details of paymentOption"
		},
		handler: function( request, reply ){
			// console.log(firebase-admin)
			
			var ref = firebase.database().ref('PaymentOptionList')
			// var IssuerListRef = ref.child('airtel_02');
			ref.orderByChild('categorynames').on("value", function(snapshot) {
				
					reply({
						statusCode: 200,
						message: 'PaymentOptionList successfully get',			
						data: snapshot
					});
			  // console.log(snapshot.val());
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'GET',
		path: '/get/PaymentOptionList/{paymentOption?}',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting details of particular paymentOption",
            notes:"In this route we are Getting particular paymentOption by paymentOption name"
		},
		handler: function( request, reply ){
			// console.log(firebase-admin)

			var paymentOption = request.params.paymentOption;

 			var ref = firebase.database().ref(`/PaymentOptionList/${paymentOption}`)
			// var IssuerListRef = ref.child('airtel_02');
			ref.orderByChild('issuername').on("value", function(snapshot) {
			reply({
				statusCode: 200,
				message: 'paymentOption successfully get',			
				data: snapshot
			});
			  // console.log(snapshot.val());
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'POST',
		path: '/post/user/details',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Post user details",
            notes:"In this route we can post details of new user"
		},
		handler: function(request, reply){
			// console.log(request.payload);
			var ref = firebase.database().ref('Users');
			var newUser = ({
				"age": request.payload.age,
				"gender": request.payload.gender,
				"name": request.payload.name,
				"password": request.payload.password,
				"username": request.payload.username
			});				
			ref.push(newUser)
			if (newUser.length === 0) {
				reply({
					statusCode: 401,
					message: "Operation not successfully Completed there is something messing"
				});
			}else{
				reply({
					statusCode: 200,
					message: "Operation successfully Completed",
					data: newUser
				});
			}
		} 
		
	},
	{
		method: 'GET',
		path: '/get/Users/{id?}',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting details of particular user",
            notes:"In this route we are Getting details of particular user"
		},
		handler: function( request, reply ){
			// console.log(firebase-admin)

			var id = request.params.id;
			console.log(request.params)
 			var ref = firebase.database().ref(`/Users/${id}`)
			// var IssuerListRef = ref.child('airtel_02');
			ref.on("value", function(snapshot) {
			reply({
				statusCode: 200,
				message: 'user successfully get',			
				data: snapshot
			});
			  // console.log(snapshot.val());
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'PUT',
		path: '/update/user/details/{id?}',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"updating user data",
            notes:"In this route user can update his details"
		},
		handler: function(request, reply){
			// console.log(request.payload);
			var id = request.params.id;
			var ref = firebase.database().ref(`/Users/${id}`);
			var newUser = ({
				"age": request.payload.age,
				"gender": request.payload.gender,
				"name": request.payload.name,
				"password": request.payload.password,
				"username": request.payload.username
			});				
			ref.update(newUser)
			if (newUser.length === 0) {
				reply({
					statusCode: 401,
					message: "user not updated successfully"
				});
			}else{
				reply({
					statusCode: 200,
					message: "user updated successfully",
					data: newUser
				});
			}
		}
		
	},
	{
		method: 'DELETE',
		path: '/delete/Users/{id?}',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"delete user data",
            notes:"In this route User can DELETE his profile with details"
		},
		handler: function(request, reply){
			// console.log("dsfkjlaskj")
			var id = request.params.id;
			let del_ref = firebase.database().ref(`/Users/${id}`);
			del_ref.remove()
			.then(function(){
				reply({ 
					statusCode: 200,
					message: 'user deleted successfully'
				});
			})
			.catch(function(error){
				console.log('Error deleting data', error);
			});
		}
	},
	{
        method: 'GET',
        path: '/scrapewebdata',
        config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting data with other websites",
            notes:"In this route we are crowling data in other websites"
		},
        handler: function(request1, reply) {
            
            console.log('fulldetails')
            request('https://www.visa.co.in/pay-with-visa/visa-offers-and-perks.html#2', function(error, response, body){
                if(!error && response.statusCode === 200){
                    var $ = cheerio.load(body);
                    console.log(body);

                    var fulldetails;
                    var json = {fulldetails : ""};

                    $('.visa-offers-list').filter(function(){
                        var data = $(this);
                        fulldetails = data.text();
                        // console.log(fulldetails[0]);
                        json.fulldetails = fulldetails;
                    })
                }
                fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
                    reply({
                        'data': fulldetails
                    })
                    console.log('File successfully written! - Check your project directory for the output.josn file');
                })
                // response.send('Check your console!')
            });
        }
    },
     {
		method: 'GET',
		path: '/get/paymentOption/list/{issuer?}',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting details of paymentOption",
            notes:"In this route we are Getting details of paymentoptionids"
		},
		handler: function( request, reply ){

			var issuer = request.params.issuer;
 			var ref = firebase.database().ref(`/IssuerList/${issuer}/paymentoptionids`)

			ref.orderByChild('issuerid').on("value", function(snapshot1) {
				if (snapshot1.val() == 0) {
					reply({
						message: "There is no any payment option"
					});
				}
			var payment = snapshot1.val();
			var ans = []
			for(var i=0; i < payment.length; i++){
				var ref1 = firebase.database().ref(`/PaymentOptionList/${payment[i]}`)

				ref1.orderByChild('issuername').on("value", function(snapshot){
					ans.push(snapshot)
				});
				if ( i === payment.length -1){
					reply(ans)
				} 
			}

			// console.log(ans)
			// console.log("hello");

			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},

]
export default routes;
