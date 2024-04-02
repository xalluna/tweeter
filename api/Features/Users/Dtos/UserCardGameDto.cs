using tweeter.Shared.PagedResult;

namespace tweeter.Features.Users.Dtos
{
    public class UserCardGameDto : PageDto
    {
        public int UserId { get; set; }
        public int GameId { get; set; }
    }
}
