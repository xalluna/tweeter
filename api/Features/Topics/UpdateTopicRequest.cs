using System.Text.Json.Serialization;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Shared;
using tweeter.Shared.Interfaces;

namespace tweeter.Features.Topics;

public class UpdateTopicRequest: IIdentifiable, IRequest<Response<TopicGetDto>>
{
    [JsonIgnore]
    public int Id { get; set; }
    public string Name { get; set; }

    public UpdateTopicRequest(int id)
    {
        Id = id;
    }
}

public class UpdateTopicRequestHandler : IRequestHandler<UpdateTopicRequest, Response<TopicGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<UpdateTopicRequest> _validator;
    private readonly IMapper _mapper;

    public UpdateTopicRequestHandler(
        DataContext dataContext,
        IValidator<UpdateTopicRequest> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }
    
    public async Task<Response<TopicGetDto>> Handle(UpdateTopicRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<TopicGetDto> { Errors = errors };
        }

        var nameExists = await _dataContext.Set<Topic>()
            .AnyAsync(x => x.Name.ToLower() == request.Name.ToLower() && x.Id != request.Id);

        if (nameExists)
        {
            return Error.AsResponse<TopicGetDto>("Name already exists", nameof(request.Name));
        }

        var topic = await _dataContext.Set<Topic>()
            .FirstOrDefaultAsync(x => x.Id == request.Id);

        if (topic is null)
        {
            return Error.AsResponse<TopicGetDto>("Topic not found", nameof(request.Id));
        }
        
        _mapper.Map(request, topic);

        await _dataContext.SaveChangesAsync();

        return _mapper.Map<TopicGetDto>(topic).AsResponse();
    }
}

public class UpdateTopicCommandValidator : AbstractValidator<UpdateTopicRequest>
{
    public UpdateTopicCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();

        RuleFor(x => x.Name.Length)
            .LessThanOrEqualTo(TopicConfiguration.NameLength);
        
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}
