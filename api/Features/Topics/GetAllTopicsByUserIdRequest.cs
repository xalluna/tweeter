using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Features.Users;
using tweeter.Features.UserTopics;
using tweeter.Shared;

namespace tweeter.Features.Topics;

public class GetAllTopicsByUserIdRequest: IRequest<Response<List<TopicGetDto>>>
{
    public int UserId { get; set; }

    public GetAllTopicsByUserIdRequest(int userId)
    {
        UserId = userId;
    }
}

public class GetAllTopicsByUserIdRequestHandler: IRequestHandler<GetAllTopicsByUserIdRequest, Response<List<TopicGetDto>>> {
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllTopicsByUserIdRequestHandler(
        DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<List<TopicGetDto>>> Handle(GetAllTopicsByUserIdRequest request, CancellationToken cancellationToken)
    {
        var userExists = await _dataContext.Set<User>().AnyAsync(x => x.Id == request.UserId);

        if (!userExists)
        {
            return Error.AsResponse<List<TopicGetDto>>("User not found", nameof(request.UserId));
        }

        var topics = await _dataContext.Set<UserTopic>()
            .Where(x => x.UserId == request.UserId)
            .Select(x => x.Topic)
            .ProjectTo<TopicGetDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return topics.AsResponse();
    }
}