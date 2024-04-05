using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Shared;

namespace tweeter.Features.Posts;

public class GetAllPostsRequest : IRequest<Response<List<PostGetDto>>> 
{
}

public class GetAllPostsRequestHandler : IRequestHandler<GetAllPostsRequest, Response<List<PostGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllPostsRequestHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }

    public async Task<Response<List<PostGetDto>>> Handle(GetAllPostsRequest request, CancellationToken cancellationToken)
    {
        var users = await _dataContext.Set<Post>()
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<PostGetDto>>(users).AsResponse();
    }
}