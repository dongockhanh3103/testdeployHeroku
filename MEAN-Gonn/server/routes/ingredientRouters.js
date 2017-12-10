var Ingredient = require('../controllers/ingredientController');  


module.exports = function(router)
 {

    router.route('/api/ingredient').post(Ingredient.createIngredient);
    router.route('/api/ingredients/page/:page').get(Ingredient.getIngredientList);
    router.route('/api/search/ingredient/:name').get(Ingredient.getIngredientByName);

    router.route('/api/ingredient/:id')
    .get(Ingredient.getIngredientByID)
    .delete(Ingredient.delIngredient)
    .put(Ingredient.updateIngredient)


   return router;
}