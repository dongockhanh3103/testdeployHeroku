module.exports = function(app) {
    var Comment = require('../controllers/commentController');  
    app.route('/api/food/post')
        .post(Comment.postComment);
    app.route('/api/food/post/:id')
        .delete(Comment.deleteComment);
}