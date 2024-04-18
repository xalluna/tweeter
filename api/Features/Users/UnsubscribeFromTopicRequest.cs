using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Features.UserTopics;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class UnsubscribeFromTopicRequest: IRequest<Response>
{
    public int TopicId { get; set; }
    public int UserId { get; set; }

    public UnsubscribeFromTopicRequest(int topicId, int userId)
    {
        TopicId = topicId;
        UserId = userId;
    }
}

public class UnsubscribeFromTopicRequestHandler : IRequestHandler<UnsubscribeFromTopicRequest, Response>
{
    private readonly UserManager<User> _userManager;
    private readonly DataContext _dataContext;

    public UnsubscribeFromTopicRequestHandler(
        UserManager<User> userManager,
        DataContext dataContext)
    {
        _userManager = userManager;
        _dataContext = dataContext;
    }
    
    public async Task<Response> Handle(UnsubscribeFromTopicRequest request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync($"{request.UserId}");

        if (user is null)
        {
            return Error.AsResponse("Must be signed in", "user");
        }
        
        var userTopic = await _dataContext.Set<UserTopic>()
            .FirstOrDefaultAsync(x => x.UserId == user.Id && x.TopicId == request.TopicId, cancellationToken: cancellationToken);

        if (userTopic is null)
        {
            return Error.AsResponse("Subscription to topic not found.");
        }

        _dataContext.Remove(userTopic);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return Response.Success;
    }
}