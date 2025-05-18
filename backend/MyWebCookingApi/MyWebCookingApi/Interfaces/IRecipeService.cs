using MyWebCookingApi.Dtos;
using MyWebCookingApi.Enums;
using MyWebCookingApi.Models;

namespace MyWebCookingApi.Interfaces
{
    public interface IRecipeService
    {
        Task<List<Recipes>> GetAll();
        Task<Recipes> CreateRecipe(RecipeParameters recipeParameters);
        Task<List<Recipes>> GetRecipesByCategories(RecipesCategoriesOptions options);
        Task<List<IngredinetRequest>> AddIngredinets(List<IngredinetRequest> ingredients);
        Task<RecipesDto?> GetRecipesById(long id);
        Task UpdateScore(int score, long recipeId);
    }
}
