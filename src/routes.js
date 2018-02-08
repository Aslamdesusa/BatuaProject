var admin = require("firebase-admin");
var firebase = require("firebase")
var request1 = require('request');
var config = require('config')
var ref1 = require('ref')
var widgets = require("widgets")
var Joi = require('joi');


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
            notes:"In this route we are Getting details of particular issuer where you have to make a request in params by issuerName",
            validate: {
            	params: {
            		issuer: Joi.string()
            	}
            }
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
            notes:"In this route we are Getting particular paymentOption by paymentOption name",
            validate: {
            	params: {
            		paymentOption: Joi.string()
            	}
            }
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
            notes:"In this route we can post details of new user",
            validate: {
            	payload: {
            		firstname : Joi.string().required(),
            		lastname : Joi.string().required(),
            		email : Joi.string().required(),
            		city : Joi.string().required(),
            		birthday : Joi.string().required(),
            		gender : Joi.string().required(),
            		phone : Joi.string().required(),
            		maritalstatus : Joi.string().required()
            	}
            }
		},
		handler: function(request, reply){
			// console.log(request.payload);
			var ref = firebase.database().ref('Users');
			var newUser = ({
				"firstname": request.payload.firstname,
				"lastname": request.payload.lastname,
				"email": request.payload.email,
				"city": request.payload.city,
				"birthday": request.payload.birthday,
				"gender": request.payload.gender,
				"phone": request.payload.phone,
				"maritalstatus": request.payload.maritalstatus
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
            notes:"In this route we are Getting details of particular user",
            validate: {
            	params: {
            		id: Joi.string()
            	}
            }
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
            notes:"In this route user can update his details",
            validate: {
            	params: {
            		id: Joi.string()
            	},
            	payload: {
            		age : Joi.string().required(),
            		gender : Joi.string().required(),
            		name : Joi.string().required(),
            		password : Joi.string().required(),
            		username : Joi.string().required()
            	}
            }
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
            notes:"In this route User can DELETE his profile with details",
            validate: {
            	params: {
            		id: Joi.string()
            	}
            }
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
		path: '/get/OfferList/{paymentOption?}',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting details of OfferList",
            notes:"In this route we are Getting details of al OfferList by paymentOptionids",
            validate: {
            	params: {
            		paymentOption: Joi.string()
            	}
            }
		},
		handler: function( request, reply ){

			var paymentOption = request.params.paymentOption;
 			var ref = firebase.database().ref(`/PaymentOptionList/${paymentOption}/offerids`)

			ref.orderByChild('issuerid').on("value", function(snapshot1) {
				if (snapshot1.val() == 0) {
					reply(snapshot1)
				}
			var offers = snapshot1.val();
			var ans = []
			for(var i=0; i < offers.length; i++){
				var ref1 = firebase.database().ref(`/OfferList/${offers[i]}`)

				ref1.orderByChild('issuername').on("value", function(snapshot){
					ans.push(snapshot)
				})
				if (i === offers.length -1) {
					reply(ans)
				}	 
				}
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},


// ======================================================================================================
	// you will get issuerlist by methods (Credit_Card, Debit_Card, Wallet)
	{
		method: 'GET',
		path: '/get/all/issuerlist/by/payment/method/Credit_Card',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting all IssuerList where method is Credit_Card",
            notes:"In this route we are Getting all details of IssuerList where method is Credit_Card"
		},
		handler: function(request, reply){
 			var ref = firebase.database().ref('IssuerList')
			ref.orderByChild('credit_card').equalTo("Yes").once("value", function(snapshot){
				reply({
					statusCode: 200,
					message: "all Credit_Card issuers successfully get",
				 	snapshot: snapshot.val()
				});
			}, function(errorObject){
				console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'GET',
		path: '/get/all/issuerlist/by/payment/method/Debit_Card',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting all IssuerList where method is Debit_Card",
            notes:"In this route we are Getting all details of IssuerList where method is Debit_Card"
		},
		handler: function(request, reply){
 			var ref = firebase.database().ref('IssuerList')
			ref.orderByChild("debit_card").equalTo("Yes").on("value", function(snapshot){
				reply({
					statusCode: 200,
					message: "all Debit_Card issuers successfully get",
				 	snapshot: snapshot.val()
				});
			}, function(errorObject){
				console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'GET',
		path: '/get/all/issuerlist/by/payment/method/Wallet',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting all IssuerList where method is Wallet",
            notes:"In this route we are Getting all details of IssuerList where method is Wallet"
		},
		handler: function(request, reply){
 			var ref = firebase.database().ref('IssuerList')
			ref.orderByChild("wallet").equalTo("Yes").on("value", function(snapshot){
				reply({
					statusCode: 200,
					message: "all Wallet issuers successfully get",
				 	snapshot: snapshot.val()
				});
			}, function(errorObject){
				console.log("The read failed: " + errorObject.code);
			});
		}
	},


// =====================================================================================================
	{
		method: 'GET',
		path: '/get/paymentOption/issuerlist/credit_card/{issuer?}',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting details of paymentOption",
            notes:"In this route we are Getting details of Credit_Cardids by issuername",
            validate: {
            	params:{
            		issuer: Joi.string()
            	}
            }
		},
		handler: function( request, reply ){

			var issuer = request.params.issuer;
 			var ref = firebase.database().ref(`/IssuerList/${issuer}/credit_card_mehtods`)

			ref.orderByChild('issuerid').on("value", function(snapshot1) {
				console.log(snapshot1.val())
				if (snapshot1.val() == 0) {
					reply(snapshot1.val())
				}
			var payment = snapshot1.val();
			var ans = []
			for(var i=0; i<payment.length; i++){
				var ref1 = firebase.database().ref(`/PaymentOptionList/${payment[i]}`)

				ref1.orderByChild('issuername').on("value", function(snapshot){
					ans.push(snapshot)
				})
				if (i === payment.length -1) {
					reply(ans)
				}	 
				}
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'GET',
		path: '/get/paymentOption/issuerlist/debit_card/{issuer?}',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting details of paymentOption",
            notes:"In this route we are Getting details of paymentoption by Debit_Cardids by issuername",
            validate: {
            	params:{
            		issuer: Joi.string()
            	}
            }
		},
		handler: function( request, reply ){

			var issuer = request.params.issuer;
 			var ref = firebase.database().ref(`/IssuerList/${issuer}/debit_card_methods`)

			ref.orderByChild('issuerid').on("value", function(snapshot1) {
				console.log(snapshot1.val())
				if (snapshot1.val() == 0) {
					reply(snapshot1.val())
				}
			var payment = snapshot1.val();
			var ans = []
			for(var i=0; i<payment.length; i++){
				var ref1 = firebase.database().ref(`/PaymentOptionList/${payment[i]}`)

				ref1.orderByChild('issuername').on("value", function(snapshot){
					ans.push(snapshot)
				})
				if (i === payment.length -1) {
					reply(ans)
				}	 
				}
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'GET',
		path: '/get/paymentOption/issuerlist/wallet/{issuer?}',
		config: {
			// include this route in swagger documentation
			tags:['api'],
            description:"Getting details of paymentOption",
            notes:"In this route we are Getting details of paymentoption by walletids by issuername",
            validate: {
            	params:{
            		issuer: Joi.string()
            	}
            }
		},
		handler: function( request, reply ){
			var issuer = request.params.issuer;
 			var ref = firebase.database().ref(`/IssuerList/${issuer}/wallet_methods`)

			ref.orderByChild('issuerid').on("value", function(snapshot1) {
				console.log(snapshot1.val())
				if (snapshot1.val() == 0) {
					reply(snapshot1.val())
				}
			var payment = snapshot1.val();
			var ans = []
			for(var i=0; i<payment.length; i++){
				var ref1 = firebase.database().ref(`/PaymentOptionList/${payment[i]}`)

				ref1.orderByChild('issuername').on("value", function(snapshot){
					ans.push(snapshot)
				})
				if (i === payment.length -1) {
					reply(ans)
				}	 
				}
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	},
	{
		method: 'POST',
		path: '/post/user/selected/methods/{user?}',
		config:{
			// include this route in swagger documentation
			tags:['api'],
            description:"posting paymentoption by user",
            notes:"In this route we are posting paymentoption which is selected by user",
			validate:{
				params:{
					user: Joi.string()
				},
				payload:{
					payselected : Joi.string().required(),
				}
			}
		},
		handler: function(request, reply){
			var user = request.params.user;
			var ref = firebase.database().ref(`/Users/${user}`);
			var payMethod = ({
				"payselected": request.payload.payselected,
			});
			ref.push(payMethod)
			if (payMethod.length === 0) {
				reply({
					statusCode: 401,
					message: "user not selected any option"
				});
			}else{
				reply({
					statusCode: 200,
					message: "user selected method add successfully",
					data: payMethod
				});
			}
		}
	}
]
export default routes;