using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class GetSignedInUserRequest : IRequest<Response<UserGetDto>>
{
}

public class GetSignedInUserRequestHandler : IRequestHandler<GetSignedInUserRequest, Response<UserGetDto>>
{
    private readonly SignInManager<User> _signInManager;
    private readonly IMapper _mapper;

    public GetSignedInUserRequestHandler(SignInManager<User> signInManager,
        IMapper mapper)
    {
        _signInManager = signInManager;
        _mapper = mapper;
    }
    
    public async Task<Response<UserGetDto>> Handle(GetSignedInUserRequest request, CancellationToken cancellationToken)
    {
        var user = await _signInManager.GetSignedInUserAsync();

        return user is null 
            ? new Response<UserGetDto>{Data = null} 
            : _mapper.Map<UserGetDto>(user).AsResponse();
    }
}