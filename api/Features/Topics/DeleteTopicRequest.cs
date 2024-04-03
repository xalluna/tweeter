using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Shared;

namespace tweeter.Features.Topics;

public class DeleteTopicRequest: IRequest<Response>
{
    public int Id { get; set; }

    public DeleteTopicRequest(int id)
    {
        Id = id;
    }
}

public class DeleteTopicRequestHandler : IRequestHandler<DeleteTopicRequest, Response>
{
    private readonly DataContext _dataContext;

    public DeleteTopicRequestHandler(DataContext dataContext)
    {
        _dataContext = dataContext;
    }
    
    public async Task<Response> Handle(DeleteTopicRequest request, CancellationToken cancellationToken)
    {
        var topic = await _dataContext.Set<Topic>()
            .FirstOrDefaultAsync(x => x.Id == request.Id);

        if (topic is null)
        {
            return Error.AsResponse("Topic not found", nameof(request.Id));
        }

        _dataContext.Remove(topic);
        await _dataContext.SaveChangesAsync();

        return Response.Success;
    }
}