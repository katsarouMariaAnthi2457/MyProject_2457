using Microsoft.AspNetCore.Mvc;
using MyWebCookingApi.Dtos;
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
}
