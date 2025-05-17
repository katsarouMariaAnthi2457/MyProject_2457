using MyWebCookingApi.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MyWebCookingApi.Models
{
    public class Ingredients
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string Name { get; set; }

        public double Amount { get; set; }

        public MeasurmentUnit MeasurmentUnit { get; set; }

        [ForeignKey(nameof(Recipes))]
        public long RecipeId { get; set; }

        public Recipes Recipes { get; set; }
    }
}
