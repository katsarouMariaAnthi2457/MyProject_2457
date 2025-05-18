using Microsoft.AspNetCore.Mvc;
using MyWebCookingApi.Dtos;
using MyWebCookingApi.Enums;
using MyWebCookingApi.Interfaces;
using MyWebCookingApi.Models;

namespace MyWebCookingApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CookingController : ControllerBase
{
    private readonly IRecipeService _recipeService;

    public CookingController(IRecipeService recipeService)
    {
        _recipeService = recipeService;
    }

    [HttpGet]
    public async Task<IActionResult> GetRecipes()
    {
        var result = await _recipeService.GetAll();

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateRecipe([FromForm] RecipeParameters recipeParameters)
    {
        var result = await _recipeService.CreateRecipe(recipeParameters);

        return Ok(result);
    }

    [HttpGet]
    [Route("recipesByCategory")]
    public async Task<IActionResult> GetRecipesByCategories(RecipesCategoriesOptions options)
    {
        var result = await _recipeService.GetRecipesByCategories(options);

        return Ok(result);
    }

    [HttpPost]
    [Route("addIngredients")]
    public async Task<IActionResult> AddIngredinets([FromBody] List<IngredinetRequest> ingredients)
    {
        var result = await _recipeService.AddIngredinets(ingredients);

        return Ok(result);
    }

    [HttpGet]
    [Route("id")]
    public async Task<IActionResult> GetRecipeById([FromQuery] long id)
    {
        var result = await _recipeService.GetRecipesById(id);
        
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateScore([FromBody] UpdateScoreParams updateScore)
    {
        await _recipeService.UpdateScore(updateScore.Score, updateScore.RecipeId);

        return Ok("Recipe score updated");
    }
}
