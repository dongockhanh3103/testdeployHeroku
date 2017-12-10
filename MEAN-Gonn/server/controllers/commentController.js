const mongoose = require('mongoose');
var Comment = require('../models/comment.js');
var User= require('../models/user');


exports.postComment = (req, res) => {
    var comment = new Comment();
    comment.foodId = req.body.foodId;
    comment.userId = req.body.userId;
    comment.text = req.body.text;
    User.findById(req.body.userId,(err, user) => {
        if(err){
            return res.send(err);
        }
        comment.userAvatar = user.avatar;
        comment.userName = user.firstname + " " + user.lastname;
        comment.save((err, cmt) => {
            if(err){
                return res.send(err);
            }
            res.json(cmt);
        });
        console.log(comment);
    });
}

exports.deleteComment = (req, res) => {
    Comment.findByIdAndRemove(req.params.id,(err, cmt) => {
        if(err){
            return res.send(err);
        }
        res.json(cmt);
    })
}