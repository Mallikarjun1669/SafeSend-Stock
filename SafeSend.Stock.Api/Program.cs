using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SafeSend.Stock.Api.Data;
using SafeSend.Stock.Api.Features.Auth;
using SafeSend.Stock.Api.Middleware;
using SafeSend.Stock.Api.Services;
using SafeSend.Stock.Api.Swagger;
using System;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// --------------------
// Data (EF Core)
// --------------------
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// --------------------
// Identity
// --------------------
builder.Services.AddIdentityCore<IdentityUser>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;

    options.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddSignInManager()
.AddDefaultTokenProviders();
builder.Services.AddScoped<MarketFluctuationService>();

builder.Services.Configure<KycStorageOptions>(builder.Configuration.GetSection("KycStorage"));

builder.Services.AddSingleton<IKycStorage, LocalKycStorage>();
builder.Services.AddScoped<KycService>();
builder.Services.AddScoped<TradingEligibilityService>();

// --------------------
// AuthZ/AuthN
// --------------------
builder.Services.AddAuthorization();

// Read JWT settings once
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];
var jwtKey = builder.Configuration["Jwt:Key"];

if (string.IsNullOrWhiteSpace(jwtIssuer) ||
    string.IsNullOrWhiteSpace(jwtAudience) ||
    string.IsNullOrWhiteSpace(jwtKey))
{
    throw new InvalidOperationException(
        "Missing JWT configuration. Please set Jwt:Issuer, Jwt:Audience, Jwt:Key in appsettings.json");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,

            ValidateAudience = true,
            ValidAudience = jwtAudience,

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),

            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(2),

            RoleClaimType = ClaimTypes.Role,
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

// --------------------
// Controllers (MVC)
// --------------------
builder.Services.AddControllers()
    .AddJsonOptions(o =>
        o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

// --------------------
// App services
// --------------------
builder.Services.AddScoped<TokenService>();
builder.Services.AddSignalR();

// --------------------
// Swagger
// --------------------
builder.Services.AddSwaggerWithJwt();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:3000"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// --------------------
// Auto-run Migrations
// --------------------
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

// --------------------
// Seed roles + default admin user
// --------------------
await IdentitySeeder.SeedAsync(app.Services);

// --------------------
// Middleware pipeline
// --------------------
app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseSwaggerUiInDev();

app.UseHttpsRedirection();

app.UseCors("Frontend");

app.UseAuthentication();
app.UseAuthorization();

// --------------------
// Map controllers
// --------------------
app.MapControllers();
app.MapHub<StockHub>("/stockHub");

app.Run();
