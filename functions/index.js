const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

// IMPORT ROUTES
const testRoute = require('./routes/test');

const app = express();
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

app.use('/test', testRoute);

exports.api = functions.https.onRequest(app);
