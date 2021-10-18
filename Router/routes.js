const UserController = require('../Controllers/userController');
const CourseController = require('../Controllers/courseController');

//Authorization
const PermissionMiddleware = require('../General/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../General/middlewares/auth.validation.middleware');
const config = require('../General/config/env.config');

exports.routesConfig = function(app) {

    app.get('/getAllUsers', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADMIN_PERMISSION),
        UserController.list
    ]);


    //insert a new User 
    app.post('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADMIN_PERMISSION),
        UserController.insert
    ]);

    //update User 
    app.patch('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADMIN_PERMISSION),
        UserController.patchById

    ]);

    //delete User by Id
    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADMIN_PERMISSION),
        UserController.deleteUserbyId
    ]);

    app.patch('/users/level/:userId', [
        PermissionMiddleware.minimumPermissionLevelRequired(config.STUDENT_PERMISSION),
        UserController.patchById
    ]);

    //Pasandole el token devuelve toda la info del usuario Todo los pueden hacer
    app.get('/getMyInfo', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.STUDENT_PERMISSION),
        UserController.getMyInfo
    ]);

    app.get('/:userId', UserController.getById);

    app.get('/users/user/:email', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.STUDENT_PERMISSION),

        UserController.getByEmail
    ]);

    //--------------------------------------------------------------------------------------------------
    //------------------------------------------Courses--------------------------------------------------
    app.post('/courses', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADMIN_PERMISSION),
        CourseController.insert
    ]);

    app.get('/courses/allcourses', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADMIN_PERMISSION),
        CourseController.list
    ]);

    app.get('/courses/:id', [
        CourseController.getCourseById
    ]);

    app.patch('/courses/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADMIN_PERMISSION),
        CourseController.patchById
    ])

    app.delete('/courses/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADMIN_PERMISSION),
        CourseController.deleteByID
    ]);

    //Add participants
    app.patch('/courses/newStudent/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADMIN_PERMISSION),
        UserController.newCourse,
        CourseController.newStudent
    ]);

    app.patch('/courses/newTeacher/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADMIN_PERMISSION),
        UserController.newCourse,
        CourseController.newTeacher
    ]);
    //En el body necesita un idStudent
    app.patch('/courses/removeStudent/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADMIN_PERMISSION),
        UserController.removeCourse,
        CourseController.removeStudent
    ]);

    //Assignment
    app.patch('/courses/newAssignment/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.TEACHER_PERMISSION),
        CourseController.newAssignment
    ]);

    app.get('/courses/assignment/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.STUDENT_PERMISSION),
        CourseController.getAssignments
    ]);

    //Noticias
    app.patch('/courses/newNew/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.TEACHER_PERMISSION),
        CourseController.newNew
    ]);

    app.get('/courses/news/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.STUDENT_PERMISSION),
        CourseController.getNews
    ]);

    //CHAT
    app.patch('/courses/chat/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.STUDENT_PERMISSION),
        CourseController.newMessage
    ]);

    app.get('/courses/chat/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.STUDENT_PERMISSION),
        CourseController.getChat
    ]);








};