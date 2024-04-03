using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Shared;

namespace tweeter.Features.Topics;

public class GetTopicByIdRequest : IRequest<Response<TopicGetDto>>
{
    public int Id { get; set; }

    public GetTopicByIdRequest(int id)
    {
        Id = id;
    }
}

public class GetTopicByIdRequestHandler : IRequestHandler<GetTopicByIdRequest, Response<TopicGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetTopicByIdRequestHandler(
        DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }

    public async Task<Response<TopicGetDto>> Handle(GetTopicByIdRequest request, CancellationToken cancellationToken)
    {
        var topic = await _dataContext.Set<Topic>()
            .FirstOrDefaultAsync(x => x.Id == request.Id);

        if (topic is null)
        {
            return Error.AsResponse<TopicGetDto>("Topic not found", "id");
        }

        return _mapper.Map<TopicGetDto>(topic).AsResponse();
    }
}