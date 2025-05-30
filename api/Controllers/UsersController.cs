﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
using tweeter.Features.Users;
using tweeter.Features.UserTopics;
using tweeter.Shared;

namespace tweeter.Controllers;

[ApiController]
[Route("/api/users")]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet(Name = nameof(GetAllUsers))]
    public async Task<ActionResult<Response<List<UserDto>>>> GetAllUsers()
    {
        var response = await _mediator.Send(new GetAllUsersRequest());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("{id:int}", Name = nameof(GetUserById))]
    public async Task<ActionResult<Response<UserGetDto>>> GetUserById([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetUserByIdRequest { Id = id });

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    [HttpPost(Name = nameof(CreateUser))]
    public async Task<ActionResult<Response<UserDetailDto>>> CreateUser([FromBody] CreateUserRequest request)
    {
        var response = await _mediator.Send(request);

        return response.HasErrors
            ? BadRequest(response)
            : CreatedAtRoute(nameof(GetUserById), new { response.Data.Id }, response);
    }

    [HttpPut("{id:int}", Name = nameof(UpdateUser))]
    public async Task<ActionResult<Response<UserGetDto>>> UpdateUser([FromRoute] int id,
        [FromBody] UpdateUserRequest request)
    {
        request.Id = id;
        
        var response = await _mediator.Send(request);

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpPut("password-update", Name = nameof(UpdatePassword))]
    public async Task<ActionResult<Response<UserGetDto>>> UpdatePassword(
        [FromBody] UpdatePasswordRequest request)
    {
        var response = await _mediator.Send(request);

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpDelete(Name = nameof(DeleteUser))]
    public async Task<ActionResult<Response>> DeleteUser([FromBody] DeleteUserRequest request)
    {
        var response = await _mediator.Send(request);

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpPost("sign-in", Name = nameof(SignInUser))]
    public async Task<ActionResult<Response<UserDetailDto>>> SignInUser(SignInUserRequest request)
    {
        var response = await _mediator.Send(request);
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpPost("sign-out", Name = nameof(SignOutUser))]
    public async Task<ActionResult<Response>> SignOutUser()
    {
        var response = await _mediator.Send(new SignOutUserRequest());
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpGet("signed-in-user", Name = nameof(GetSignedInUser))]
    public async Task<ActionResult<Response<List<UserDto>>>> GetSignedInUser()
    {
        var response = await _mediator.Send(new GetSignedInUserRequest());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpPost("subscribe/{topicId}", Name = nameof(Subscribe))]
    public async Task<ActionResult<Response<UserTopicDto>>> Subscribe([FromRoute] int topicId, int userId)
    {
        var response = await _mediator.Send(new SubscribeToTopicRequest(topicId, userId));

        return response.HasErrors ? BadRequest(response)
            : CreatedAtRoute(nameof(Subscribe), new { response.Data.UserId, response.Data.TopicId }, response);
    }

    [HttpPost("unsubscribe/{topicId}", Name = nameof(Unsubscribe))]
    public async Task<ActionResult<Response>> Unsubscribe([FromRoute] int topicId, int userId)
    {
        var response = await _mediator.Send(new UnsubscribeFromTopicRequest(topicId, userId));

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}