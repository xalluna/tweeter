using tweeter.Features.Roles;

namespace tweeter.Features.Users.Dtos;

public class UserRoleDto : UserGetDto
{
    public List<RoleGetDto> Roles { get; set; }
}