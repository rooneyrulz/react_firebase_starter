const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const firebase = require('firebase');

const app = express();

admin.initializeApp();
firebase.initializeApp(require('./config/db.config'));

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// USE ROUTES
app.use('/test', require('./routes/test'));
app.use('/items', require('./routes/item'));
app.use('/auth', require('./routes/auth'));

exports.api = functions.https.onRequest(app);
