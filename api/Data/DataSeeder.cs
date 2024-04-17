using Microsoft.AspNetCore.Identity;
using tweeter.Features.Users;

namespace tweeter.Data;

public static class DataSeeder
{
    public static void Seed(this DataContext dataContext, UserManager<User> userManager)
    {
        SeedUsers(userManager).Wait();

        dataContext.SaveChanges();
    }

    private static async Task SeedUsers(UserManager<User> userManager)
    {
        var devAccountUser = new User
        {
            Email = "dev@tweeter.com",
            UserName = "Admin",
            PhoneNumber = "9859859859",
        };
        
        var deannaUser = new User
        {
            Email = "deanna@tweeter.com",
            UserName = "Deanna",
            PhoneNumber = "9859859859",
        };
        
        var brandonUser = new User
        {
            Email = "brandon@tweeter.com",
            UserName = "Brandon",
            PhoneNumber = "9859859859",
        };

        var devAccount = await userManager.FindByEmailAsync(devAccountUser.Email);
        var deannaAccount = await userManager.FindByEmailAsync(deannaUser.Email);
        var brandonAccount = await userManager.FindByEmailAsync(brandonUser.Email);

        if(devAccount is null)
        {
            await userManager.CreateAsync(devAccountUser, "Password1!");
        }
        
        if(deannaAccount is null)
        {
            await userManager.CreateAsync(deannaUser, "Password1!");
        } 
        
        if(brandonAccount is null)
        {
            await userManager.CreateAsync(brandonUser, "Password1!");
        }
    }
}
