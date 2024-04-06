using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using tweeter.Data;
using tweeter.Features.Users;
using tweeter.Shared;

namespace tweeter.Features.Posts;

public class CreatePostRequest : PostDto, IRequest<Response<PostGetDto>>
{
}

public class CreatePostRequestHandler : IRequestHandler<CreatePostRequest, Response<PostGetDto>>
{
    private readonly IValidator<CreatePostRequest> _validator;
    private readonly IMapper _mapper;
    private readonly SignInManager<User> _signInManager;
    private readonly DataContext _dataContext;

    public CreatePostRequestHandler(IValidator<CreatePostRequest> validator, 
        IMapper mapper, SignInManager<User> signInManager, DataContext dataContext)
    {
        _validator = validator;
        _mapper = mapper;
        _signInManager = signInManager;
        _dataContext = dataContext;
    }

    public async Task<Response<PostGetDto>> Handle(CreatePostRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<PostGetDto> { Errors = errors };
        }

        var currentUser = await _signInManager.GetSignedInUserAsync();

        if (currentUser is null)
        {
            return Error.AsResponse<PostGetDto>("Must be signed in", "user");
        }

        var post = _mapper.Map<Post>(request);
        post.UserId = currentUser.Id;
        post.CreatedDate = DateTimeOffset.Now;
        post.IsDeleted = false;

        _dataContext.Set<Post>().Add(post);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<PostGetDto>(post).AsResponse();
    }
}

public class CreatePostRequestValidator : AbstractValidator<CreatePostRequest>
{
    public CreatePostRequestValidator(IValidator<PostDto> baseValidator)
    {
        Include(baseValidator);
    }
}