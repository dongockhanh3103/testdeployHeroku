const mongoose = require('mongoose');
var Food = require('../models/food.js');
var Like = require('../models/like.js');


exports.hitLike = (req, res) => {
    var userId = req.body.userId;
    var foodId = req.body.foodId;
    Like.find({"userId": userId, "foodId": foodId}, (err, result) => {
        if(err){
            return res.send(err);
        }
        if(result.length == 0){
            
            Like.create(req.body, (err, result) => {
                if(err){
                    return res.send(err);
                }
                Food.findById(foodId,(err, food) =>{
                    if(err){
                        return res.send(err);
                    }
                    console.log(food);
                    food.like = food.like + 1;
                    food.save();
                    res.json(food);
                });
            });
        } else {
            //Already like -> unlike
            Like.remove({"userId": userId, "foodId": foodId}, (err, result) => {
                if(err){
                    return res.send(err);
                }
                Food.findById(foodId,(err, food) =>{
                    if(err){
                        return res.send(err);
                    }
                    console.log(food);
                    food.like = food.like - 1;
                    food.save();
                    res.json(food);
                });
            });
        }
    })
}