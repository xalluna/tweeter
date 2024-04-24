using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Features.UserTopics;
using tweeter.Shared;

namespace tweeter.Features.Topics;

public class GetAllSubscribedTopicsRequest: IRequest<Response<List<TopicDetailDto>>>
{
    public int UserId {get; set;}
    public GetAllSubscribedTopicsRequest(int userId)
    {
        UserId = userId;
    }
}

public class GetAllSubscribedTopicsRequestHandler: IRequestHandler<GetAllSubscribedTopicsRequest, Response<List<TopicDetailDto>>> {
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllSubscribedTopicsRequestHandler(
        DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<List<TopicDetailDto>>> Handle(GetAllSubscribedTopicsRequest request, CancellationToken cancellationToken)
    {
        var topics = await _dataContext.Set<UserTopic>()
            .Where(x => x.UserId == request.UserId)
            .Select(x => x.Topic)
            .ProjectTo<TopicDetailDto>(_mapper.ConfigurationProvider)
            .OrderByDescending(x => x.CreatedDate)
            .ToListAsync(cancellationToken);

        return topics.AsResponse();
    }
}