using MyWebCookingApi.Dtos;
using MyWebCookingApi.Models;

namespace MyWebCookingApi.Interfaces
{
    public interface IRecipeService
    {
        Task<List<Recipes>> GetAll();
    }
}
