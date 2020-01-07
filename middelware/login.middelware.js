const md5 = require('md5');
const Users = require('../models/user.model');

module.exports.postLogin = async function(req,res,next){
	var email =  req.body.email;
	var password = req.body.password;
	
	var user = await Users.findOne({
          email: email
     }, function (err) {
          if (err) {
               return err;
          }
     }); 
     if (!user) {
          res.render('login', {
               errors: ['User dose not exit.'],
               values: req.body
          });
          return;
     }
     if (user.password !== md5(password)) {
          res.render('login', {
               errors: ['Wrong Password.'],
               values: req.body
          })
          return;
     }
     res.cookie('userID',user.id,{
          signed:true
     });
	res.redirect('/user/submit');
     next();
}