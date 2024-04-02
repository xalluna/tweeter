﻿using Microsoft.AspNetCore.Identity;
using tweeter.Features.Roles;
using tweeter.Features.Users;
using tweeter.Shared;

namespace tweeter.Data;

public static class DataSeeder
{
    public static void Seed(this DataContext dataContext, UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        SeedUsersAndRoles(userManager, roleManager).Wait();

        dataContext.SaveChanges();
    }

    private static async Task SeedUsersAndRoles(UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        var roleNames = typeof(Roles).GetFields().ToList();

        foreach (var roleName in roleNames)
        {
            var roleExists = await roleManager.RoleExistsAsync(roleName.Name);
            if (!roleExists)
            {
                await roleManager.CreateAsync(new Role { Name = roleName.Name });
            }
        }

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
            await userManager.AddToRoleAsync(devAccountUser, Roles.Admin);
        }
    }
}
