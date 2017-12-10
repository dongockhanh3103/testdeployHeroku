module.exports = function(app) {
    var Food = require('../controllers/foodController');  
    app.route('/api/food')
        .post(Food.createFood);
    
    app.route('/api/food/:id')
        .get(Food.getFood)
        .put(Food.updateFood)
        .delete(Food.deleteFood);

    app.route('/api/food/page/:page')
        .get(Food.getFoodList);

    app.route('/api/search/food')
        .get(Food.searchFood);
}