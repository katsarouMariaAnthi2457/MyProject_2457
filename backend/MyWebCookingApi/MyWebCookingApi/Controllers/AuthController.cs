using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyWebCookingApi.Dtos;
using MyWebCookingApi.Models;
using System;
using System.IdentityModel.Tokens.Jwt;

//using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
//using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;

namespace MyWebCookingApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<MyUser> _userManager;
        private readonly SignInManager<MyUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<MyUser> userManager, SignInManager<MyUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null)
                return Unauthorized("Invalid username or password.");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
                return Unauthorized("Invalid username or password.");

            var token = GenerateJwtToken(user);

            return Ok(new { Token = token });
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupDto signupDto)
        {
            var user = new MyUser
            {
                UserName = signupDto.Username,
                Email = signupDto.Email,
                FirstName = signupDto.FirstName,
                LastName = signupDto.LastName
            };

            var result = await _userManager.CreateAsync(user, signupDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("User created successfully");
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();  // Κάνει sign out τον χρήστη
            return Ok(new { Message = "Logged out successfully." });
        }

        private string GenerateJwtToken(MyUser user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["ValidIssuer"],
                audience: jwtSettings["ValidAudience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
