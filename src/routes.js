var admin = require("firebase-admin");
var firebase = require("firebase")
// var IssuerList = require("")
var db = require('firebase')
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
		method: 'DELETE',
		path: '/get/data/by/issuername',
		handler: function(request, reply){
			console.log('skjdf');
			var deleteDoc = db.collection('IssuerList').doc('airtel_01').delete();
			reply('yehh got it');
		}
		
	}

]
export default routes;
