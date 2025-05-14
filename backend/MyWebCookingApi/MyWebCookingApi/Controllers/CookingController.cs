using Microsoft.AspNetCore.Mvc;
using MyWebCookingApi.Dtos;
using MyWebCookingApi.Enums;
using MyWebCookingApi.Interfaces;

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

    [HttpGet]
    [Route("recipesByCategory")]
    public async Task<IActionResult> GetRecipesByCategories(RecipesCategoriesOptions options)
    {
        var result = await _recipeService.GetRecipesByCategories(options);

        return Ok(result);
    }
}
