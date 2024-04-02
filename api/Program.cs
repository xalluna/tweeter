using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tweeter;
using tweeter.Features.Roles;
using tweeter.Features.Users;
using tweeter.Data;
using tweeter.Shared;

var builder = WebApplication.CreateBuilder(args);
var environment = builder.Environment;
builder.Configuration.AddJsonFile("appsettings.json").AddJsonFile($"appsettings.{environment.EnvironmentName}.json", optional: true);
var startup = new Startup(builder);
startup.ConfigureServices(builder.Services);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseCors(policyBuilder =>
{
    policyBuilder.WithOrigins(builder.Configuration[AppSettings.CorsOrigins].Split(","))
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});

SeedData(app);

void SeedData(IApplicationBuilder app)
{
    var scoped = app.ApplicationServices.CreateScope();

    var userManager = scoped.ServiceProvider.GetService<UserManager<User>>();
    var roleManager = scoped.ServiceProvider.GetService<RoleManager<Role>>();

    var dataContext = scoped.ServiceProvider.GetService<DataContext>();
    dataContext.Database.Migrate();
    dataContext.Seed(userManager, roleManager);
}

app.Run();
