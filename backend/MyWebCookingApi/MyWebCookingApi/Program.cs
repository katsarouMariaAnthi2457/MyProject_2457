using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyWebCookingApi.DbContext;
using MyWebCookingApi.Implementation;
using MyWebCookingApi.Interfaces;
using MyWebCookingApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

// Database context
var connectionString = builder.Configuration.GetConnectionString("MyCookinAppConnectionString");
builder.Services.AddDbContext<CookingDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});

// Identity configuration
builder.Services.AddIdentity<MyUser, IdentityRole>()
    .AddEntityFrameworkStores<CookingDbContext>()
    .AddDefaultTokenProviders();

// JWT Authentication setup
//var jwtSecret = builder.Configuration["JwtSettings:SecretKey"];
//var key = Encoding.ASCII.GetBytes(jwtSecret);

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.UTF8.GetBytes(jwtSettings["Secret"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,     // Βάλε true και ορίστε αν έχεις issuer
        ValidateAudience = false,   // Βάλε true και ορίστε αν έχεις audience
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// CORS policy - επιτρέπει τα πάντα (για development)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")  
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Services
builder.Services.AddScoped<IRecipeService, RecipeService>();

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

// Authentication & Authorization — μόνο μία φορά
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
