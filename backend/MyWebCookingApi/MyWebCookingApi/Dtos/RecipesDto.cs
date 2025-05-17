using MyWebCookingApi.Enums;
using MyWebCookingApi.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MyWebCookingApi.Dtos
{
    public class RecipesDto
    {
        public long Id { get; set; }

        public RecipesCategoriesOptions CategoriesOptions { get; set; }

        public string Name { get; set; }

        public int DificultyScore { get; set; }

        public int Score { get; set; }

        public string Execution { get; set; }

        public int Portions { get; set; }

        public string FilePath { get; set; }

        public List<IngredientsDto>? Ingredients { get; set; }
    }
}
