using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Shared;

namespace tweeter.Features.Topics;

public class GetAllTopicsRequest: IRequest<Response<List<TopicGetDto>>>
{
}

public class GetAllTopicsRequestHandler: IRequestHandler<GetAllTopicsRequest, Response<List<TopicGetDto>>> {
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllTopicsRequestHandler(
        DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<List<TopicGetDto>>> Handle(GetAllTopicsRequest request, CancellationToken cancellationToken)
    {
        var topics = await _dataContext.Set<Topic>()
            .ProjectTo<TopicGetDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return topics.AsResponse();
    }
}