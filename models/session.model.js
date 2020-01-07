var mongoose = require('mongoose');
 var sessionSchema =  new mongoose.Schema({
 	sessionID: String
 });

 var Session = mongoose.model('Session', sessionSchema, 'sessions');
 module.exports = Session;