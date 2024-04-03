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
    
    public SubscribeToTopicRequest(int topicId)
    {
        TopicId = topicId;
    }
}

public class SubscribeToTopicRequestHandler : IRequestHandler<SubscribeToTopicRequest, Response<UserTopicDto>>
{
    private readonly SignInManager<User> _signInManager;
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public SubscribeToTopicRequestHandler(
        SignInManager<User> signInManager,
        DataContext dataContext,
        IMapper mapper)
    {
        _signInManager = signInManager;
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<UserTopicDto>> Handle(SubscribeToTopicRequest request, CancellationToken cancellationToken)
    {
        var user = await _signInManager.GetSignedInUserAsync();

        if (user is null)
        {
            return Error.AsResponse<UserTopicDto>("User not logged in");
        }
        
        var subscriptionExists = await _dataContext.Set<UserTopic>()
            .AnyAsync(x => x.UserId == user.Id && x.TopicId == request.TopicId);

        if (subscriptionExists)
        {
            return Error.AsResponse<UserTopicDto>("Already subscribed to topic.");
        }

        var userTopic = _mapper.Map<UserTopic>(request);

        _dataContext.Add(userTopic);
        await _dataContext.SaveChangesAsync();

        return _mapper.Map<UserTopicDto>(userTopic).AsResponse();
    }
}