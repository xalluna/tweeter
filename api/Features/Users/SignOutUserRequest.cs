using MediatR;
using Microsoft.AspNetCore.Identity;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class SignOutUserRequest : IRequest<Response>
{
}

public class SignOutUserRequestHandler : IRequestHandler<SignOutUserRequest, Response>
{
    private readonly SignInManager<User> _signInManager;

    public SignOutUserRequestHandler(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task<Response> Handle(SignOutUserRequest request, CancellationToken cancellationToken)
    {
        await _signInManager.SignOutAsync();

        return Response.Success;
    }
}