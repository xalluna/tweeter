using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Features.UserTopics;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class SignInUserRequest: SignInUserDto, IRequest<Response<UserDetailDto>>
{
}

public class SignInUserRequestHandler : IRequestHandler<SignInUserRequest, Response<UserDetailDto>>
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public SignInUserRequestHandler(UserManager<User> userManager,
        SignInManager<User> signInManager,
        DataContext dataContext,
        IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<UserDetailDto>> Handle(SignInUserRequest request, CancellationToken c)
    {
        var normalizedUserName = _userManager.NormalizeName(request.UserName);
        
        var user = await _userManager
            .Users
            .FirstOrDefaultAsync(x => x.NormalizedUserName == normalizedUserName, c);
        
        if (user is null) return Error.AsResponse<UserDetailDto>("Username or password is incorrect");

        var result = await _signInManager.PasswordSignInAsync(user, request.Password, true, false);
        
        if (!result.Succeeded) return Error.AsResponse<UserDetailDto>("Username or password is incorrect");
        if (result.IsNotAllowed)  return Error.AsResponse<UserDetailDto>("User is not allowed to sign in");
        if (result.IsLockedOut) return Error.AsResponse<UserDetailDto>("User is locked out");

        if (result.RequiresTwoFactor)
        {
            return Error.AsResponse<UserDetailDto>("2FA not implemented 💔");
        }

        var topicIds = await _dataContext.Set<UserTopic>()
            .Where(x => x.UserId == user.Id)
            .Select(x => x.TopicId)
            .ToListAsync(cancellationToken:new CancellationToken());

        var mappedUser = _mapper.Map<UserDetailDto>(user);
        mappedUser.TopicIds = topicIds;
        
        return mappedUser.AsResponse();
    }
}