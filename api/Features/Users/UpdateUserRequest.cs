using System.Text.Json.Serialization;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using tweeter.Data;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class UpdateUserRequest : UserDto, IRequest<Response<UserGetDto>>
{
    [JsonIgnore]
    public int Id { get; set; }
}

public class UpdateUserRequestHandler : IRequestHandler<UpdateUserRequest, Response<UserGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateUserRequest> _validator;
    private readonly UserManager<User> _userManager;

    public UpdateUserRequestHandler(DataContext dataContext,
        IValidator<UpdateUserRequest> validator,
        UserManager<User> userManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _userManager = userManager;
    }

    public async Task<Response<UserGetDto>> Handle(UpdateUserRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserGetDto> { Errors = errors };
        }

        var user = _userManager.Users
            .SingleOrDefault(x => x.Id == request.Id);

        if (user is null)
        {
            return Error.AsResponse<UserGetDto>("User not found", "id");
        }

        _mapper.Map(request, user);
        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response<UserGetDto>{Errors = errors};
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserGetDto>(user).AsResponse();
    }
}

public class UpdateUserCommandValidator : AbstractValidator<UpdateUserRequest>
{
    public UpdateUserCommandValidator(IValidator<UserDto> baseValidator)
    {
        Include(baseValidator);
        
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}