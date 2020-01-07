const Users = require('../models/user.model');
module.exports.requireAuth = async function(req,res,next){
    if(!req.signedCookies.userID){
        res.redirect('/');
        return;
    }
    var user = await Users.findOne(
        {_id : req.signedCookies.userID},
        (err) => {return err}
    );
    if(!user){
        res.redirect('/');
        return;
    }
    res.locals.user = user
    next();
};