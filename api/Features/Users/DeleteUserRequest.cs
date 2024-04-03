using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Features.Topics;
using tweeter.Features.UserTopics;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class DeleteUserRequest : IRequest<Response>
{
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
}

public class DeleteUserRequestHandler : IRequestHandler<DeleteUserRequest, Response>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<DeleteUserRequest> _validator;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public DeleteUserRequestHandler(DataContext dataContext,
        IMapper mapper,
        IValidator<DeleteUserRequest> validator,
        UserManager<User> userManager,
        SignInManager<User> signInManager
        )
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _userManager = userManager;
        _signInManager = signInManager;
    }
    public async Task<Response> Handle(DeleteUserRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var user = await _signInManager.GetSignedInUserAsync();

        if (user is null)
        {
            return Error.AsResponse("Unable to determine User", "user");
        }

        var correctPassword = await _userManager .CheckPasswordAsync(user, request.Password);

        if(!correctPassword)
        {
            return Error.AsResponse("Unable to delete account.", "user");
        }

        await _dataContext.Set<UserTopic>()
            .Where(x => x.UserId == user.Id)
            .Select(x => x.Topic)
            .ExecuteDeleteAsync();
        
        await _dataContext.Set<UserTopic>()
            .Where(x => x.UserId == user.Id)
            .ExecuteDeleteAsync();

        var result = await _userManager.DeleteAsync(user);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response{Errors = errors};
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        return Response.Success;
    }
}

public class DeleteUserRequestValidator : AbstractValidator<DeleteUserRequest>
{
    public DeleteUserRequestValidator()
    {
        RuleFor(x => x.Password)
            .NotEmpty();

        RuleFor(x => x.ConfirmPassword)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Equal(x => x.Password)
            .WithMessage("Passwords do not match.");
    }
}
