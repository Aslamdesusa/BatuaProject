var admin = require("firebase-admin");
var firebase = require("firebase")
// var IssuerList = require("")
var db = require('firebase')
var widgets = require("widgets")
var Joi = require('joi');



const routes = [
	{
		method: 'GET',
		path: '/get/all/IssuerList',
		handler: function( request, reply ){
			// console.log(firebase-admin)
			
			var ref = firebase.database().ref('IssuerList')
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
		path: '/get/IssuerList/{issuer?}',
		handler: function( request, reply ){
			// console.log(firebase-admin)

			var issuer = request.params.issuer;

 			var ref = firebase.database().ref(`/IssuerList/${issuer}`)
			// var IssuerListRef = ref.child('airtel_02');
			ref.orderByChild('issuername').on("value", function(snapshot) {
			reply({
				statusCode: 200,
				message: 'you have successfully get data',			
				data: snapshot
			});
			  // console.log(snapshot.val());
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
					message: "Operation not successfully Completed"
				});
			}else{
				reply({
					statusCode: 200,
					message: "Operation successfully Completed",
					data: newUser
				});
			}
		}
		
	}

]
export default routes;