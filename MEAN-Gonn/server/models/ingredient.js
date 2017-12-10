const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
var isNumber = require("isnumber");

/**
 * Validation
 */
/**validate Lenght name ingrediet */
let nameCheckerLenght = (name) => {
    if (!name) {
        return false;
    }
    else {
        if (name.lenght < 1) return false;
        return true;
    }
};

/**validate lenght description ingrediet */
let desCheckerLenght = (description) => {
    if (!description) {
        return false;
    }
    else {
        if (description.lenght < 1) return false;

        return true;
    }
}
/**validate value price */
let priceValid = (price) => {
    if (!price) return false;
    else if(!isNumber(price))
    {
        return false;
    }
    else {
         if (price < 0) return false;
    }
    return true;
}
/**Validator */
const nameValidators = [{ validator: nameCheckerLenght, message: "Name must be at least 1 character" }];
const desValidators = [{ validator: desCheckerLenght, message: "Description must be at least 1 character" }];
const priceValidators = [{ validator: priceValid, message: "Price can not be less than 0 vnd" }]

var IngredientSchema = new Schema({
    name: { type: String, required: true, validate: nameValidators },
    backdrop: { type: String, required: true},
    description: { type: String, required: true, validate: desValidators },
    price: { type: Number, required: true, validate: priceValidators },
    date: { type: Date, required: true },
    unit: { type: String, required: true }
})

module.exports = mongoose.model('Ingredient', IngredientSchema);