using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class GetUserByIdRequest : IRequest<Response<UserGetDto>>
{
    public int Id { get; set; }
}

public class GetUserByIdRequestHandler : IRequestHandler<GetUserByIdRequest, Response<UserGetDto>>
{
    private readonly UserManager<User> _userManager;
    private readonly IValidator<GetUserByIdRequest> _validator;
    private readonly IMapper _mapper;

    public GetUserByIdRequestHandler(UserManager<User> userManager,
        IValidator<GetUserByIdRequest> validator,
        IMapper mapper)
    {
        _userManager = userManager;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<Response<UserGetDto>> Handle(GetUserByIdRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserGetDto> { Errors = errors };
        }

        var user = _userManager.Users
            .SingleOrDefault(x => x.Id == request.Id);

        if (user is null) return Error.AsResponse<UserGetDto>("User not found", "id");

        return _mapper.Map<UserGetDto>(user).AsResponse();
    }
}

public class GetUserByIdRequestValidator : AbstractValidator<GetUserByIdRequest>
{
    public GetUserByIdRequestValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}