module.exports = function(app) {
    var Like = require('../controllers/likeController');  
    app.route('/api/like')
        .post(Like.hitLike);
}