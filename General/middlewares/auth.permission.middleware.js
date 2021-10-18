const jwt = require('jsonwebtoken'),
    secret = require('../config/env.config')['jwt_secret'];

const ADMIN_PERMISSION = 2048;

exports.minimumPermissionLevelRequired = (required_permission_level) => {
    
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.permissionLevel);
        if (user_permission_level & required_permission_level) {
            return next();
        } 
        if(user_permission_level == ADMIN_PERMISSION){
            
            return next();
        }
        else {
            return res.status(403).send();
        }
    };
};

exports.sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;

    if (req.params.userId !== userId) {
        return next();
    } else {
        return res.status(400).send();
    }
};
