const router = require('express-promise-router')();

const authMiddleware = require('./middlewares/authMiddleware').authMiddleware;

const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

router.route('/signup').post(userController.signUp);
router.route('/forget-password').get(userController.forgetPassword);
router.route('/change-password').post(userController.changePassword);
router.route('/verify-email').get(userController.verifyEmail);
router.route('/login').post(authController.login);
router.route('/logout').post(authMiddleware, authController.logout);
router.route('/post').post(authMiddleware, postController.addPost);
router.route('/post/:id').put(authMiddleware, postController.updatePost);
router.route('/post/:id').delete(authMiddleware, postController.deletePost);
router.route('/post/:id').get(authMiddleware, postController.getPost);
router.route('/post').get(authMiddleware, postController.getFeed);

module.exports = {
    router
};
