const md5 = require('md5');
const Users = require('../models/user.model');

module.exports.submit = function(req,res){
	res.render('submit');
}

module.exports.info = function(req,res){
	var user = res.locals.user;
	//console.log(user);
	res.render('info', user);
}