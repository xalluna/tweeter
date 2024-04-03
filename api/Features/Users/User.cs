using Microsoft.AspNetCore.Identity;
using tweeter.Shared.Interfaces;

namespace tweeter.Features.Users;

public class User : IdentityUser<int>, IIdentifiable
{
    public List<IdentityUserClaim<int>> Claims { get; set; }
    public List<IdentityUserLogin<int>> Logins { get; set; }
    public List<IdentityUserToken<int>> Tokens { get; set; }
    public List<IdentityUserRole<int>> Roles { get; set; }
}

public class UserGetDto : UserDto
{
    public int Id { get; set; }
}

public class UserDto
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}