const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    StartTime: String,
    EndTime: String,
    dayOne: String,
    dayTwo: String
});
const newsSchema = new Schema({
    title: String,
    description: String
});
const assignmentsSchema = new Schema({
    code: String,
    title: String,
    description: String,
    deadline: String
});
const messageSchema = new Schema({
    writer: String,
    message: String,
    time: String
});
const participantSchema = new Schema({
    _id: ObjectId,
    name: String
});
const courseSchema = new Schema({
    name: { type: String, required: true },
    grade: { type: Number, min: 1, max: 6, required: true },
    schedule: scheduleSchema,
    news: [newsSchema],
    assignments: [assignmentsSchema],
    chat: [messageSchema],
    teacher: participantSchema,
    Students: [participantSchema]
}, { versionKey: false });

courseSchema.findById = function(id) {
    return this.model('courses').find({ _id: id });
};



//modelo
const Course = mongoose.model('courses', courseSchema);

exports.createCourse = (courseData) => {
    const course = new Course(courseData);
    return course.save();
};

exports.findById = (id) => {
    return Course.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            return result;
        });
}

exports.patchCourse = (id, courseData) => {
    return Course.findOneAndUpdate({
        _id: id
    }, courseData);
};


exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Course.deleteOne({ _id: id }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
}

exports.newStudent = (id, student) => {
    return Course.findOneAndUpdate({ _id: id }, { $push: { Students: student } });
}

exports.newteacher = (id, pteacher) => {
    return Course.findOneAndUpdate({ _id: id }, { teacher: pteacher.user });
}

exports.newNews = (id, student) => {
    return Course.findOneAndUpdate({ _id: id }, { $push: { news: student } });
}

exports.newMessage = (id, message) => {
    return Course.findOneAndUpdate({ _id: id }, { $push: { chat: message } });
}

exports.newAssignment = (id, assignment) => {
    return Course.findOneAndUpdate({ _id: id }, { $push: { assignments: assignment } });
}

exports.getAssignments = (id) => {
    return Course.find({ _id: id })
        .limit(10)
        .select({ "assignments": 1, _id: 0 })
        .sort({ _id: -1 });
};

exports.getNews = (id) => {
    return Course.find({ _id: id })
        .limit(10)
        .select({ "news": 1, _id: 0 })
        .sort({ _id: -1 });
};

exports.getChat = (id) => {
    return Course.find({ _id: id })
        .limit(10)
        .select({ "chat": 1, _id: 0 })
        .sort({ _id: -1 });
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Course.find()
            .select({ "name": 1, _id: 1 })
            .limit(perPage)
            .skip(perPage * page)
            .exec(function(err, course) {
                if (err) {
                    reject(err);
                } else {
                    resolve(course);
                }
            })
    });
};

exports.removeStudent = (idCourse,id) => {
    return Course.findOneAndUpdate({_id: idCourse},{ $pull: { Students: {_id: id} } });
}
