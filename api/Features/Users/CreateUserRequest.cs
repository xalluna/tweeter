using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using tweeter.Data;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class CreateUserRequest : UserCreateDto, IRequest<Response<UserGetDto>>
{
}

public class CreateUserRequestHandler : IRequestHandler<CreateUserRequest, Response<UserGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateUserRequest> _validator;
    private readonly UserManager<User> _userManager;

    public CreateUserRequestHandler(DataContext dataContext,
        IValidator<CreateUserRequest> validator,
        UserManager<User> userManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _userManager = userManager;
    }

    public async Task<Response<UserGetDto>> Handle(CreateUserRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserGetDto> { Errors = errors };
        }

        var user = _mapper.Map<User>(request);

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response<UserGetDto>{Errors = errors};
        }

        result = await _userManager.AddToRoleAsync(user, "Basic");

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response<UserGetDto> { Errors = errors };
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        var returnedUser = _userManager.Users.SingleOrDefault(x => x.Id == user.Id);

        if (returnedUser is null)
        {
            return Error.AsResponse<UserGetDto>("Something went wrong.", "user");
        }

        return _mapper.Map<UserGetDto>(returnedUser).AsResponse();
    }
}

public class CreateUserRequestValidator : AbstractValidator<CreateUserRequest>
{
    public CreateUserRequestValidator(IValidator<UserDto> baseValidator)
    {
        Include(baseValidator);
        
        RuleFor(x => x.Password)
            .Must((com, prop) => com.ConfirmPassword == prop)
            .WithMessage("Passwords do not match");
    }
}