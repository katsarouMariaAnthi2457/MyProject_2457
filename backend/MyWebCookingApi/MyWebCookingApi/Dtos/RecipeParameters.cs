using MyWebCookingApi.Enums;

namespace MyWebCookingApi.Dtos
{
    public class RecipeParameters
    {
        public RecipesCategoriesOptions CategoriesOptions { get; set; }

        public string Name { get; set; }

        public int DificultyScore { get; set; }

        public int Score { get; set; } = 0;

        public string? Execution { get; set; }

        public int Portions { get; set; }

        public IFormFile File { get; set; }
    }
}
