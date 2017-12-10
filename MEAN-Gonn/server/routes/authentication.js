
const User=require('../controllers/userController');

module.exports=function(router){
  
    router.route('/register')
    .post(User.resgisterUser);

    router.route('/updatepassword')
    .post(User.updatePasswordUser);

    router.route('/updateinfo')
    .post(User.updateInfoUser);

    router.route('/login')
    .post(User.postLoginUser)

    router.route('/activate/:token').get(User.activeUser);

    router.route('/reset').put(User.resetPassword);
    router.route('/reset/:token').get(User.resetPasswordGet);
    router.route('/confirmreset').put(User.savePassword);
    router.route('/getuser/:token').get(User.getUser);
    router.route('/checkuser/:token').get(User.checkCurrentUser);
    

   return router;
}