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
            UserName = "dev@tweeter.com",
            PhoneNumber = "9859859859",
        };

        var devAccount = await userManager.FindByEmailAsync(devAccountUser.Email);

        if(devAccount is null)
        {
            await userManager.CreateAsync(devAccountUser, "Password1!");
        }
    }
}
