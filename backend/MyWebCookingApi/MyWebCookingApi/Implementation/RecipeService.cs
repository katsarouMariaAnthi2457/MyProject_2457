using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebCookingApi.DbContext;
using MyWebCookingApi.Dtos;
using MyWebCookingApi.Interfaces;
using MyWebCookingApi.Models;

namespace MyWebCookingApi.Implementation
{
    public class RecipeService : IRecipeService
    {
        private readonly CookingDbContext _dbContext;

        public RecipeService(CookingDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Recipes>> GetAll()
        {
            var recipesList = new List<Recipes>();

            try
            {
                recipesList = await _dbContext.Recipes.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return recipesList;
        }      
        public async Task<List<Recipes>> GetRecipesByCategories(RecipesCategoriesOptions options)
        {
            var result = await _dbContext.Recipes.Where(r => r.CategoriesOptions == options).ToListAsync();

            return result;
        }
    }
}
