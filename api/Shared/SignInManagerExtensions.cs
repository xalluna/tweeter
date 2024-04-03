using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tweeter.Features.Users;

namespace tweeter.Shared;

public static class SignInManagerExtensions
{
    public static async Task<User?> GetSignedInUserAsync(this SignInManager<User> signInManager)
    {
        var userName = signInManager.Context.User.Identity?.Name;

        if (userName is null) return null;

        var userManager = signInManager.UserManager; 
        var normalizedUserName = userManager.NormalizeName(userName);
        
        return await userManager
            .Users
            .FirstOrDefaultAsync(x => x.NormalizedUserName == normalizedUserName);
    }
}