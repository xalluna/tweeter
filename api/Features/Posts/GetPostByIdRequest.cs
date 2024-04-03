using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Shared;

namespace tweeter.Features.Posts;

public class GetPostByIdRequest : IRequest<Response<PostGetDto>>
{
    public int Id { get; set; }
}

public class GetPostByIdRequestHandler : IRequestHandler<GetPostByIdRequest, Response<PostGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetPostByIdRequestHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }

    public async Task<Response<PostGetDto>> Handle(GetPostByIdRequest request, CancellationToken cancellationToken)
    {
        var post = await _dataContext.Set<Post>()
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        return post is null ? Error.AsResponse<PostGetDto>("Post not found", "id") : _mapper.Map<PostGetDto>(post).AsResponse();
    }
}