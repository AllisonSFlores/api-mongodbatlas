const User = require('../Models/User');
const crypto = require('crypto');



exports.getById = (req, res) => {

    User.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByEmail = (req, res) => {
    User.findbyemail(req.params.email)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getMyInfo = (req, res) => {
    User.findById(req.jwt.userId)
        .then((result) => {
            res.status(200).send(result);
        });
}

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;

    console.log(req.body);
    User.createUser(req.body)
        .then((result) => {
            res.status(201).send({ g: result.body });
        });
};

exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }
    User.patchUser(req.params.userId, req.body).then((result) => {
        res.status(200).send({});
    });
};

exports.deleteUserbyId = (req, res) => {
    User.removeById(req.params.userId).then((result) => {
        res.status(200).send({});
    });
};

exports.newCourse = (req, res, next) => {
    console.log(req.body);
    console.log('UserController', req.body.user._id, req.body.course)
    User.newCourse(req.body.user._id, req.body.course).then(() => {
        return next();
    }).catch((err) => {
        res.status(400).send();
    });

};
exports.removeCourse = (req, res, next) => {
    User.removeCourse(req.body.idStudent,req.params.id).then(() => {
        return next();
    }).catch((err) => {
        console.log(err);
        console.log("ahiiiiiiiiiiiiiiiii")
        res.status(400).send();
    });
}
exports.list = (req, res) => {
    User.list(30, 0)
        .then((result) => {
            res.status(200).send(result);
        })
};