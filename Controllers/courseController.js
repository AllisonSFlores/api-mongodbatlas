const Course = require('../Models/Curso');

exports.insert = (req, res) => {
    Course.createCourse(req.body)
        .then((result) => {
            res.status(201).send();
        });
};

exports.getCourseById = (req, res) => {
    Course.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        });
}

exports.patchById = (req, res) => {
    Course.patchCourse(req.params.id, req.body).then((result) => {
        res.status(200).send({})
    });
}

exports.deleteByID = (req, res) => {
    Course.removeById(req.params.id).then((result) => {
        res.status(200).send({})
    });
}

exports.newStudent = (req, res) => {
    Course.newStudent(req.params.id, req.body.user).then((result) => {
        res.status(200).send({})
    });
}

exports.removeStudent = (req, res) => {
    Course.removeStudent(req.params.id, req.body.idStudent).then((result) => {
        res.status(200).send({})
    });
}

exports.newNew = (req, res) => {
    Course.newNews(req.params.id, req.body).then((result) => {
        res.status(201).send({})
    });
}

exports.newTeacher = (req, res) => {
    Course.newteacher(req.params.id, req.body).then((result) => {
        res.status(201).send({})
    });
}

exports.newMessage = (req, res) => {
    req.body.writer = req.jwt.name
    Course.newMessage(req.params.id, req.body).then((result) => {
        res.status(201).send({})
    });
}

exports.newAssignment = (req, res) => {
    console.log(req.body);
    req.params.id = req.params.id.replace(/\:/g, '')
    Course.newAssignment(req.params.id, req.body).then((result) => {
        res.status(201).send({})
    });
}

exports.getAssignments = (req, res) => {
    Course.getAssignments(req.params.id).then((result) => {
        res.status(200).send(result);
    });
}

exports.getNews = (req, res) => {
    Course.getNews(req.params.id).then((result) => {
        res.status(200).send(result);
    });
}

exports.getChat = (req, res) => {
    Course.getChat(req.params.id).then((result) => {
        res.status(200).send(result);
    });
}
exports.list = (req, res) => {
    Course.list(30, 0)
        .then((result) => {
            res.status(200).send(result);
        }).catch((err) => { console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrro") })
};
