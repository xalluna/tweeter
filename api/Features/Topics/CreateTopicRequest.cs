using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Features.Users;
using tweeter.Features.UserTopics;
using tweeter.Shared;

namespace tweeter.Features.Topics;

public class CreateTopicRequest: IRequest<Response<TopicGetDto>>
{
    public string Name { get; set; }
    public int UserId { get; set; }
    
    public CreateTopicRequest(int userId, string name)
    {
        UserId = userId;
        Name = name;
    }
}

public class CreateTopicRequestHandler : IRequestHandler<CreateTopicRequest, Response<TopicGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<CreateTopicRequest> _validator;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    public CreateTopicRequestHandler(
        DataContext dataContext,
        IValidator<CreateTopicRequest> validator,
        IMapper mapper,
        UserManager<User> userManager)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
        _userManager = userManager;
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
            .AnyAsync(x => x.Name.ToLower() == request.Name.ToLower(), cancellationToken: cancellationToken);

        if (nameExists)
        {
            return Error.AsResponse<TopicGetDto>("Name already exists", nameof(request.Name));
        }
        
        var user = await _userManager.FindByIdAsync($"{request.UserId}");

        if (user is null)
        {
            return Error.AsResponse<TopicGetDto>("Must be signed in", "user");
        }
        
        var topic = _mapper.Map<Topic>(request);
        
        topic.CreatedByUser = user;
        topic.CreatedDate = DateTimeOffset.Now;
        
        _dataContext.Add(topic);
        
        _dataContext.Add(new UserTopic
        {
            UserId = user.Id,
            Topic = topic
            
        });
        
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<TopicGetDto>(topic).AsResponse();
    }
}

public class CreateTopicRequestValidator : AbstractValidator<CreateTopicRequest>
{
    public CreateTopicRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}