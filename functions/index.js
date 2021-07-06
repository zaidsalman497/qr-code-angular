const functions = require("firebase-functions");
const admin = require('firebase_admin');
const stripe = require('stripe')('sk_test_51J9MZbJ6E4w7cr4JoZ5TkejLpuJDjCdMdY679BsbGIdYymbcjM6jEj5WnNOKSDJOWrrODpg8e1MHVbjXnsMbvLNm0011j0Qq6s');
admin.initializeApp(functions.config().firebase);

exports.stripeChargeCall = functions.https.onCall(async (data, context ) => {
    if(!data || data.charge) return
    const doc = admin.firestore().collection('source').doc()
    doc.set(data)

    const source = data.id;
    const email = 'zaidsalman497@gmail.com'
    const customer = await stripe.customer.create({ email, source});
    const idempotencyKey = doc.id;

    const amount = data.amount;
    const currency = 'usd';
  
    const charge = { amount, currency, source, customer: customer.id };

    const charge_1 = await (stripe.charges.create(charge, { idempotencyKey }));

  if (charge_1.paid === true) {
    admin.firestore().collection('charges').doc().set(charge_1);
    return {result: 'SUCCESSFUL'};
  } else {
    admin.firestore().collection('charges_error').doc().set({charge_1});
    return {result: 'FAILED'};
  }
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
