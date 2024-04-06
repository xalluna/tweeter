using MediatR;
using Microsoft.AspNetCore.Mvc;
using tweeter.Features.Posts;
using tweeter.Shared;

namespace tweeter.Controllers;

[ApiController]
[Route("/api/posts")]
public class PostsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PostsController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet(Name = nameof(GetAllPosts))]
    public async Task<ActionResult<Response<List<PostDto>>>> GetAllPosts()
    {
        var response = await _mediator.Send(new GetAllPostsRequest());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpGet("{id:int}", Name = nameof(GetPostById))]
    public async Task<ActionResult<Response<PostGetDto>>> GetPostById([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetPostByIdRequest{Id = id});

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpPost(Name = nameof(CreatePost))]
    public async Task<ActionResult<Response<PostGetDto>>> CreatePost([FromBody] CreatePostRequest request)
    {
        var response = await _mediator.Send(request);

        return response.HasErrors
            ? BadRequest(response) :  Ok(response);
    }
    
    [HttpPut("{id:int}", Name = nameof(UpdatePost))]
    public async Task<ActionResult<Response<PostGetDto>>> UpdatePost([FromRoute] int id,
        [FromBody] UpdatePostRequest request)
    {
        request.Id = id;
        var response = await _mediator.Send(request);

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpDelete("{id:int}", Name = nameof(DeletePost))]
    public async Task<ActionResult<Response>> DeletePost([FromRoute] int id)
    {
        var response = await _mediator.Send(new DeletePostByIdRequest{Id = id});

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}