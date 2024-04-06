using System.Text.Json.Serialization;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Shared;

namespace tweeter.Features.Posts;

public class UpdatePostRequest : IRequest<Response<PostGetDto>>
{
    [JsonIgnore] public int Id { get; set; }
    public string Content { get; set; }
}

public class UpdatePostRequestHandler : IRequestHandler<UpdatePostRequest, Response<PostGetDto>>
{
    private readonly IValidator<UpdatePostRequest> _validator;
    private readonly IMapper _mapper;
    private readonly DataContext _dataContext;

    public UpdatePostRequestHandler(IValidator<UpdatePostRequest> validator,
        IMapper mapper, DataContext dataContext)
    {
        _validator = validator;
        _mapper = mapper;
        _dataContext = dataContext;
    }

    public async Task<Response<PostGetDto>> Handle(UpdatePostRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<PostGetDto>{Errors = errors};
        }

        var post = await _dataContext.Set<Post>()
            .Where(x => !x.IsDeleted)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (post is null)
        {
            return Error.AsResponse<PostGetDto>("Post not found", "id");
        }

        post.Content = request.Content;
        
        await _dataContext.SaveChangesAsync(cancellationToken);
        return _mapper.Map<PostGetDto>(post).AsResponse();
    }
}

public class UpdatePostRequestValidator : AbstractValidator<UpdatePostRequest>
{
    public UpdatePostRequestValidator()
    {
        RuleFor(x => x.Content)
            .NotEmpty();
    }
}