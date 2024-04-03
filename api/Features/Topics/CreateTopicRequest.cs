using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Shared;

namespace tweeter.Features.Topics;

public class CreateTopicRequest: TopicDto, IRequest<Response<TopicGetDto>>
{
}

public class CreateTopicRequestHandler : IRequestHandler<CreateTopicRequest, Response<TopicGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<TopicDto> _validator;
    private readonly IMapper _mapper;

    public CreateTopicRequestHandler(
        DataContext dataContext,
        IValidator<TopicDto> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }
    
    public async Task<Response<TopicGetDto>> Handle(CreateTopicRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<TopicGetDto> { Errors = errors };
        }
        
        var nameExists = await _dataContext.Set<Topic>()
            .AnyAsync(x => x.Name.ToLower() == request.Name.ToLower());

        if (nameExists)
        {
            return Error.AsResponse<TopicGetDto>("Name already exists", nameof(request.Name));
        }


        var topic = _mapper.Map<Topic>(request);

        _dataContext.Add(topic);
        await _dataContext.SaveChangesAsync();

        return _mapper.Map<TopicGetDto>(topic).AsResponse();
    }
}