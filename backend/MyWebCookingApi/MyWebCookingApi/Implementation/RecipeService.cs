using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MyWebCookingApi.DbContext;
using MyWebCookingApi.Dtos;
using MyWebCookingApi.Enums;
using MyWebCookingApi.Interfaces;
using MyWebCookingApi.Models;
using System;

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

        public async Task<Recipes> CreateRecipe(RecipeParameters recipeParameters)
        {
            var wwwRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            // Ensure the directory exists
            if (!Directory.Exists(wwwRootPath))
            {
                Directory.CreateDirectory(wwwRootPath);
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(recipeParameters.File.FileName);
            var filePath = Path.Combine(wwwRootPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await recipeParameters.File.CopyToAsync(stream);
            }

            // Save only the relative path for frontend to use
            var relativePath = "images/" + fileName;

            var newRecipe = new Recipes()
            {
                CategoriesOptions = recipeParameters.CategoriesOptions,
                Name = recipeParameters.Name,
                DificultyScore = recipeParameters.DificultyScore,
                Execution = recipeParameters.Execution,
                Score = recipeParameters.Score,
                Portions = recipeParameters.Portions,
                FilePath = relativePath,
            };

            try
            {
                var createdRecipe = _dbContext.Recipes.Add(newRecipe);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return newRecipe;
        }

        public async Task<List<Recipes>> GetRecipesByCategories(RecipesCategoriesOptions options)
        {
            var result = await _dbContext.Recipes.Where(r => r.CategoriesOptions == options).ToListAsync();

            return result;
        }

        public async Task<List<IngredinetRequest>> AddIngredinets(List<IngredinetRequest> ingredients)
        {
            var ingredientsList = new List<Ingredients>();

            foreach (var item in ingredients)
            {
               var tempIngedient = new Ingredients()
               {
                   Name = item.Name,
                   Amount = item.Amount,
                   MeasurmentUnit = item.MeasurmentUnit,
                   RecipeId = item.RecipeId,
               };

                ingredientsList.Add(tempIngedient);
            }

            _dbContext.AddRange(ingredientsList);

            await _dbContext.SaveChangesAsync();

            return ingredients;
        }

        public async Task<RecipesDto?> GetRecipesById(long id)
        {
            var dbresult = await _dbContext.Recipes.Where(r => r.Id == id).Include(r => r.Ingredients).FirstOrDefaultAsync();


            if (dbresult == null)
            {
                return null;
            }

            var result = new RecipesDto()
            {
                Id = dbresult.Id,
                CategoriesOptions = dbresult.CategoriesOptions,
                Name = dbresult.Name,
                DificultyScore = dbresult.DificultyScore,
                Score = dbresult.Score,
                Execution = dbresult.Execution,
                Portions = dbresult.Portions,
                FilePath = dbresult.FilePath,
                Ingredients = new List<IngredientsDto>()
            };

            foreach (var item in dbresult.Ingredients.ToList())
            {
                result.Ingredients.Add(new IngredientsDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Amount = item.Amount,
                    MeasurmentUnit = item.MeasurmentUnit,
                    RecipeId = item.RecipeId,
                });
            }

            return result;
        }

        public async Task UpdateScore(int score, long recipeId)
        {
            var recipe = _dbContext.Recipes.Where(d => d.Id == recipeId).FirstOrDefault();

            recipe.Score = score;
        }
    }
}
