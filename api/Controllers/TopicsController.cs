using MediatR;
using Microsoft.AspNetCore.Mvc;
using tweeter.Features.Topics;
using tweeter.Shared;

namespace tweeter.Controllers;

[ApiController]
[Route("/api/topics")]
public class TopicsController: ControllerBase
{
    private readonly IMediator _mediator;

    public TopicsController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet(Name = nameof(GetAllTopics))]
    public async Task<ActionResult<Response<List<TopicDetailDto>>>> GetAllTopics()
    {
        var response = await _mediator.Send(new GetAllTopicsRequest());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("{id:int}", Name = nameof(GetTopicById))]
    public async Task<ActionResult<Response<TopicGetDto>>> GetTopicById([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetTopicByIdRequest(id));

        return response.HasErrors ? NotFound(response) : Ok(response);
    }
    
    [HttpGet("home-page/{userId:int}", Name = nameof(GetHomePageTopics))]
    public async Task<ActionResult<Response<TopicGetDto>>> GetHomePageTopics([FromRoute] int userId)
    {
        var response = await _mediator.Send(new GetHomePageTopicsRequest(userId));

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    [HttpPost(Name = nameof(CreateTopic))]
    public async Task<ActionResult<Response<TopicGetDto>>> CreateTopic([FromBody] CreateTopicRequest request)
    {
        var response = await _mediator.Send(request);

        return response.HasErrors
            ? BadRequest(response)
            : CreatedAtRoute(nameof(GetTopicById), new { response.Data.Id }, response);
    }

    [HttpPut("{id:int}", Name = nameof(UpdateTopic))]
    public async Task<ActionResult<Response<TopicGetDto>>> UpdateTopic([FromRoute] int id,
        [FromBody] UpdateTopicRequest request)
    {
        request.Id = id;
        
        var response = await _mediator.Send(request);

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpDelete("{id:int}",Name = nameof(DeleteTopic))]
    public async Task<ActionResult<Response>> DeleteTopic([FromRoute] int id)
    {
        var response = await _mediator.Send(new DeleteTopicRequest(id));

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpGet("users/{userId}", Name = nameof(GetAllTopicsByUserId))]
    public async Task<ActionResult<Response<List<TopicGetDto>>>> GetAllTopicsByUserId([FromRoute] int userId)
    {
        var response = await _mediator.Send(new GetAllTopicsByUserIdRequest(userId));

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}