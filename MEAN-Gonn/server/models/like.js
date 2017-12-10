const mongoose = require('mongoose');
var LikeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
    
 });
 
 module.exports = mongoose.model('Like',LikeSchema);