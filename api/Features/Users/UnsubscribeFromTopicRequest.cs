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

    public UnsubscribeFromTopicRequest(int topicId)
    {
        TopicId = topicId;
    }
}

public class UnsubscribeFromTopicRequestHandler : IRequestHandler<UnsubscribeFromTopicRequest, Response>
{
    private readonly SignInManager<User> _signInManager;
    private readonly DataContext _dataContext;

    public UnsubscribeFromTopicRequestHandler(
        SignInManager<User> signInManager,
        DataContext dataContext)
    {
        _signInManager = signInManager;
        _dataContext = dataContext;
    }
    
    public async Task<Response> Handle(UnsubscribeFromTopicRequest request, CancellationToken cancellationToken)
    {
        var user = await _signInManager.GetSignedInUserAsync();

        if (user is null)
        {
            return Error.AsResponse("User not logged in");
        }
        var userTopic = await _dataContext.Set<UserTopic>()
            .FirstOrDefaultAsync(x => x.UserId == user.Id && x.TopicId == request.TopicId);

        if (userTopic is null)
        {
            return Error.AsResponse("Subscription to topic not found.");
        }

        _dataContext.Remove(userTopic);
        await _dataContext.SaveChangesAsync();

        return Response.Success;
    }
}