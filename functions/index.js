const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const firebase = require('firebase');

// IMPORT DB CONFIG
const dbConfig = require('../config/db.config');

// IMPORT ROUTES
const testRoute = require('./routes/test');
const itemRoute = require('./routes/item');
const authRoute = require('./routes/auth');

const app = express();

admin.initializeApp();
firebase.initializeApp(dbConfig);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

app.use('/test', testRoute);
app.use('/items', itemRoute);
app.use('/auth', authRoute);

exports.api = functions.https.onRequest(app);
