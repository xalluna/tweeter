using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Shared;

namespace tweeter.Features.Topics;

public class GetAllTopicsRequest: IRequest<Response<List<TopicDetailDto>>>
{
}

public class GetAllTopicsRequestHandler: IRequestHandler<GetAllTopicsRequest, Response<List<TopicDetailDto>>> {
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllTopicsRequestHandler(
        DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<List<TopicDetailDto>>> Handle(GetAllTopicsRequest request, CancellationToken cancellationToken)
    {
        var topics = await _dataContext.Set<Topic>()
            .ProjectTo<TopicDetailDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return topics.AsResponse();
    }
}