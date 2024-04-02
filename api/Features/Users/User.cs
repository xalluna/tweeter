using Microsoft.AspNetCore.Identity;
using tweeter.Features.Decks;
using tweeter.Features.UserRoles;
using tweeter.Features.UserCards;
using tweeter.Shared.Interfaces;
using tweeter.Features.Roles;

namespace tweeter.Features.Users;

public class User : IdentityUser<int>, IIdentifiable
{
    public List<IdentityUserClaim<int>> Claims { get; set; }
    public List<IdentityUserLogin<int>> Logins { get; set; }
    public List<IdentityUserToken<int>> Tokens { get; set; }
    public List<UserRole> UserRoles { get; set; }
    public List<UserCard> UserCards { get; set; }
    public List<Deck> Decks { get; set; }
}

public class UserGetDto : UserDto
{
    public int Id { get; set; }
    public List<RoleGetDto> Roles { get; set; }
}

public class UserDto
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}