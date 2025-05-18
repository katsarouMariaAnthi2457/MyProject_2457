using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MyWebCookingApi.Enums;

namespace MyWebCookingApi.Models
{
    public class Recipes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [EnumDataType(typeof(RecipesCategoriesOptions))]
        public RecipesCategoriesOptions CategoriesOptions { get; set; }

        public string Name { get; set; }

        public int DificultyScore { get; set; }

        public int Score { get; set; }

        public string Execution { get; set; }

        public int Portions { get; set; }

        public string FilePath { get; set; }

        public int NumberOfVotes { get; set; }

        public virtual ICollection<Ingredients> Ingredients { get; set; }
    }
}
