using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Features.UserTopics;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class SubscribeToTopicRequest: IRequest<Response<UserTopicDto>>
{
    public int TopicId { get; set; }
    public int UserId { get; set; }
    
    public SubscribeToTopicRequest(int topicId, int userId)
    {
        TopicId = topicId;
        UserId = userId;
    }
}

public class SubscribeToTopicRequestHandler : IRequestHandler<SubscribeToTopicRequest, Response<UserTopicDto>>
{
    private readonly UserManager<User> _userManager;
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public SubscribeToTopicRequestHandler(
        UserManager<User> userManager,
        DataContext dataContext,
        IMapper mapper)
    {
        _userManager = userManager;
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<UserTopicDto>> Handle(SubscribeToTopicRequest request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync($"{request.UserId}");

        if (user is null)
        {
            return Error.AsResponse<UserTopicDto>("Must be signed in", "user");
        }
        
        var subscriptionExists = await _dataContext.Set<UserTopic>()
            .AnyAsync(x => x.UserId == user.Id && x.TopicId == request.TopicId, cancellationToken: cancellationToken);

        if (subscriptionExists)
        {
            return Error.AsResponse<UserTopicDto>("Already subscribed to topic.");
        }

        var userTopic = _mapper.Map<UserTopic>(request);
        userTopic.User = user;

        _dataContext.Add(userTopic);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserTopicDto>(userTopic).AsResponse();
    }
}