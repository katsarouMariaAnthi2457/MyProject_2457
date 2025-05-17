using MyWebCookingApi.Enums;

namespace MyWebCookingApi.Dtos
{
    public class IngredinetRequest
    {
        public string Name { get; set; }

        public double Amount { get; set; }

        public MeasurmentUnit MeasurmentUnit { get; set; }

        public long RecipeId { get; set; }
    }
}
