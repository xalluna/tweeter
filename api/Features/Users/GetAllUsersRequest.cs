using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tweeter.Shared;

namespace tweeter.Features.Users;

public class GetAllUsersRequest : IRequest<Response<List<UserGetDto>>>
{
}

public class GetAllUsersRequestHandler : IRequestHandler<GetAllUsersRequest, Response<List<UserGetDto>>>
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public GetAllUsersRequestHandler(UserManager<User> userManager,
        IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<Response<List<UserGetDto>>> Handle(GetAllUsersRequest request, CancellationToken cancellationToken)
    {
        var users = await _userManager.Users
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<UserGetDto>>(users).AsResponse();
    }
}