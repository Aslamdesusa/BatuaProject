var admin = require("firebase-admin");
var firebase = require("firebase")
var request1 = require('request');
// var IssuerList = require("")
// var db = require('firebase')
var widgets = require("widgets")
var Joi = require('joi');



const routes = [
	{
		method: 'GET',
		path: '/get/IssuerList/{issuer?}',
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
		handler: function( request, reply ){
			// console.log(firebase-admin)
			
			var ref = firebase.database().ref('IssuerList')
			// var IssuerListRef = ref.child('airtel_02');
			// ref.orderByChild('categorynames').on("value", function(snapshot) {
			ref.orderByChild('IssuerList').limitToLast().on("child_added", function(snapshot) {
				
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

]
export default routes;
