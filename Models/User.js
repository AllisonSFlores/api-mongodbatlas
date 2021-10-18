const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    _id: { type: ObjectId, required: true },
    name: String
})

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    id_card: String,
    name: String,
    permissionLevel: Number,
    level: { type: Number, min: 1, max: 6 },
    courses: [courseSchema]
}, { versionKey: false });

userSchema.findById = function(id) {
    return this.model('users').find({ _id: id });
};

//modelo
const User = mongoose.model('users', userSchema);

exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            if (result != null) {
                result = result.toJSON();
                delete result._id;
                delete result.__v;

                return result;
            }


        });
};

exports.findbyemail = (pemail) => {
    return User.find({ email: pemail });
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteOne({ _id: userId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.newCourse = (id, course) => {
    return User.findOneAndUpdate({ _id: id }, { $push: { courses: course } });

};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function(err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.removeCourse = (idStudent,id) => {
    console.log(idStudent,id);
    return User.findOneAndUpdate({_id: idStudent},{ $pull: { courses: {_id: id} } });
}