const shortid = require('shortid');

const Session = require('../models/session.model');

module.exports.sessionID = async function (req, res, next) {
    if (!req.signedCookies.sessionUserID) {
        var sessionID = shortid.generate();
        res.cookie('sessionID', sessionID,{
			signed: true
		});
        
        var data = new Session({
            sessionID : sessionID,
        });
        await data.save(function(err){
            if(err){
                return err;
            }
        });
    }
    next();
}