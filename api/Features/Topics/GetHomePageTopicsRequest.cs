using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Features.Posts;
using tweeter.Features.UserTopics;
using tweeter.Shared;

namespace tweeter.Features.Topics;

public class GetHomePageTopicsRequest: IRequest<Response<List<TopicDetailDto>>>
{
    public int UserId {get; set;}
    public GetHomePageTopicsRequest(int userId)
    {
        UserId = userId;
    }
}

public class GetHomePageTopicsRequestHandler: IRequestHandler<GetHomePageTopicsRequest, Response<List<TopicDetailDto>>> {
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetHomePageTopicsRequestHandler(
        DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<List<TopicDetailDto>>> Handle(GetHomePageTopicsRequest request, CancellationToken cancellationToken)
    {
        var topics = await _dataContext.Set<UserTopic>()
            .Where(x => x.UserId == request.UserId)
            .Select(x => x.Topic)
            .ProjectTo<TopicDetailDto>(_mapper.ConfigurationProvider)
            .OrderByDescending(x => x.CreatedDate)
            .ToListAsync(cancellationToken);

        GetRecentTwoPostsPerTopic(topics);
        return topics.AsResponse();
    }

    private static void GetRecentTwoPostsPerTopic(List<TopicDetailDto> topics)
    {
        foreach (var topic in topics)
        {
            topic.Posts = topic.Posts
                .OrderByDescending(x => x.CreatedDate)
                .Take(2)
                .ToList();
        }
    }
}