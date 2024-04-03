using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class UpdatePasswordRequest : UserPasswordUpdateDto, IRequest<Response>
{
}

public class UpdatePasswordCommandHandler : IRequestHandler<UpdatePasswordRequest, Response>
{
    private readonly IMapper _mapper;
    private readonly IValidator<UpdatePasswordRequest> _validator;
    private readonly UserManager<User> _userManager;

    public UpdatePasswordCommandHandler(IValidator<UpdatePasswordRequest> validator, UserManager<User> userManager, IMapper mapper)
    {
        _mapper = mapper;
        _validator = validator;
        _userManager = userManager;
    }

    public async Task<Response> Handle(UpdatePasswordRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var user = _userManager.Users
            .FirstOrDefault(x => x.UserName == request.UserName);

        if (user is null)
        {
            return Error.AsResponse("Username or password is incorrect.");
        }

        var correctPassword = await _userManager.CheckPasswordAsync(user, request.CurrentPassword);

        if (!correctPassword)
        {
            return Error.AsResponse("Username or password is incorrect.");
        }

        var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response { Errors = errors };
        }

        return Response.Success;
    }
}

public class UpdatePasswordRequestValidator : AbstractValidator<UpdatePasswordRequest>
{
    public UpdatePasswordRequestValidator()
    {
        RuleFor(x => x.UserName)
            .NotEmpty();

        RuleFor(x => x.NewPasswordConfirmation)
            .NotEmpty();

        RuleFor(x => x.NewPassword)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Equal(x => x.NewPasswordConfirmation)
            .WithMessage("New Password and New Password Confirmation do not match.");
    }
}