using MyWebCookingApi.Dtos;
using MyWebCookingApi.Models;

namespace MyWebCookingApi.Interfaces
{
    public interface IRecipeService
    {
        Task<List<Recipes>> GetAll();
        Task<List<Recipes>> GetRecipesByCategories(RecipesCategoriesOptions options);
    }
}
