using Microsoft.AspNetCore.Identity;

namespace MyWebCookingApi.Models
{
    public class MyUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
