using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using tweeter.Data;
using tweeter.Features.Users;
using tweeter.Shared;

namespace tweeter.Features.Posts;

public class CreatePostRequest : PostDto, IRequest<Response<PostDetailDto>>
{
}

public class CreatePostRequestHandler : IRequestHandler<CreatePostRequest, Response<PostDetailDto>>
{
    private readonly IValidator<CreatePostRequest> _validator;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;
    private readonly DataContext _dataContext;

    public CreatePostRequestHandler(IValidator<CreatePostRequest> validator, 
        IMapper mapper, UserManager<User> userManager, DataContext dataContext)
    {
        _validator = validator;
        _mapper = mapper;
        _userManager = userManager;
        _dataContext = dataContext;
    }

    public async Task<Response<PostDetailDto>> Handle(CreatePostRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<PostDetailDto> { Errors = errors };
        }

        var user = await _userManager.FindByIdAsync($"{request.UserId}");

        if (user is null)
        {
            return Error.AsResponse<PostDetailDto>("Must be signed in", "user");
        }

        var post = _mapper.Map<Post>(request);
        post.UserId = user.Id;
        post.CreatedDate = DateTimeOffset.Now;
        post.IsDeleted = false;

        _dataContext.Set<Post>().Add(post);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<PostDetailDto>(post).AsResponse();
    }
}

public class CreatePostRequestValidator : AbstractValidator<CreatePostRequest>
{
    public CreatePostRequestValidator(IValidator<PostDto> baseValidator)
    {
        Include(baseValidator);
    }
}