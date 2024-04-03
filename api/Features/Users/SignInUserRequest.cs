using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class SignInUserRequest: SignInUserDto, IRequest<Response<UserGetDto>>
{
}

public class SignInUserRequestHandler : IRequestHandler<SignInUserRequest, Response<UserGetDto>>
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IMapper _mapper;

    public SignInUserRequestHandler(UserManager<User> userManager,
        SignInManager<User> signInManager,
        IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _mapper = mapper;
    }
    
    public async Task<Response<UserGetDto>> Handle(SignInUserRequest request, CancellationToken c)
    {
        var normalizedUserName = _userManager.NormalizeName(request.UserName);
        
        var user = await _userManager
            .Users
            .FirstOrDefaultAsync(x => x.NormalizedUserName == normalizedUserName, c);
        
        if (user is null) return Error.AsResponse<UserGetDto>("Username or password is incorrect");

        var result = await _signInManager.PasswordSignInAsync(user, request.Password, true, false);
        
        if (!result.Succeeded) return Error.AsResponse<UserGetDto>("Username or password is incorrect");
        if (result.IsNotAllowed)  return Error.AsResponse<UserGetDto>("User is not allowed to sign in");
        if (result.IsLockedOut) return Error.AsResponse<UserGetDto>("User is locked out");

        if (result.RequiresTwoFactor)
        {
            return Error.AsResponse<UserGetDto>("2FA not implemented 💔");
        }

        return _mapper.Map<UserGetDto>(user).AsResponse();
    }
}