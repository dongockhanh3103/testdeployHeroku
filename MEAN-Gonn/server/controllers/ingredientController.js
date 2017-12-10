const mongoose = require("mongoose");
var Ingredient = require("../models/ingredient.js");
var isNumber = require("isnumber");

exports.createIngredient = (req, res) => {
  // if (req.session.user) {
  if (!req.body.name) {
    res.send({ success: false, message: "Tên nguyên liệu không được trống" });
  } else {
    if (!req.body.description) {
      res.send({
        success: false,
        message: "Nội dung không được trống"
      });
    } else {
      if (!req.body.price) {
        res.send({
          success: false,
          message: "Giá nguyên liệu không được trống"
        });
      } else {
        if (!isNumber(req.body.price)) {
          res.json({ success: false, message: "Giá nguyên liệu phải là số" });
        } else if (!req.body.unit) {
          res.json({ success: false, message: "Đơn vị không được trống" });
        } else if (!req.body.backdrop) {
            res.json({ success: false, message: "Ảnh bìa không được trống" });      
        }
        else
        {
          var currentDay = new Date();
          let ingredient = new Ingredient({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            date: currentDay,
            unit: req.body.unit,
            backdrop: req.body.backdrop
          });
          ingredient.save((err, ingredient) => {
            if (err) return res.json({success: false, err: err});
            res.json({success: true, ingredient: ingredient});
          });
        }
      }
    }
  }
  
};

exports.getIngredientList = (req, res) => {
  var page = req.params.page;
  var skipItem = (page-1) * 12;
  Ingredient.find((err, ingredients) => {
      if(err){
          return  res.json({success: false, err: err});
      }
      console.log(ingredients);
      if (ingredients.length < 12){
          res.json({success: true, ingredients: ingredients, isEnd: true, size: ingredients.length});
      } else {
          res.json({success: true, ingredients: ingredients, isEnd: false, size: ingredients.length});
      }
     
  }).sort({_id: -1}).skip(skipItem).limit(12);
};

exports.getIngredientByName = (req, res) => {
  var searchIng = req.param("name");
  Ingredient.find({ name: new RegExp(searchIng, "i") }, (err, ingredients) => {
    if (err) return res.json({success: false, err: err});
    res.json({success: true, ingredient: ingredient});
  });
};

exports.getIngredientByID = (req, res) => {
  // console.log(req.params.id);
  Ingredient.findById(req.params.id, (err, ingredient) => {
    if (err) return res.json({success: false, err: err});
    res.json({success: true, ingredient: ingredient});
  });
};

exports.delIngredient = (req, res) => {
  Ingredient.findByIdAndRemove(req.params.id, (err, done) => {
    if (err) {
      res.send("wrong");
    }
    res.status(200).send({ success: true, message: "Delete clearly" });
  });
};
exports.updateIngredient = (req, res) => {
  Ingredient.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        unit: req.body.unit,
        backdrop: req.body.backdrop
      }
    },
    { new: true },
    (err, ingredient) => {
      if (err) return res.json({success: false, err: err});
      res.json({success: true, ingredient: ingredient});
    }
  );
};