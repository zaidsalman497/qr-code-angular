const functions = require("firebase-functions");
const admin = require('firebase_admin');
admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')('sk_test_51J9MZbJ6E4w7cr4JoZ5TkejLpuJDjCdMdY679BsbGIdYymbcjM6jEj5WnNOKSDJOWrrODpg8e1MHVbjXnsMbvLNm0011j0Qq6s');

exports.createStripecustomer = firebase.default.auth

.user.onCreate(event => {
  const user = event.data;

  return stripe.customer.create({
    email: user.email
  })

  .then(customer => {
       const updates = {}
       updates['/customer/${customer.id}']  = user.uid;
       updates['/users/${user.uid}']  = customer.id

       return admin.database().ref().update(updates)
  })
})

