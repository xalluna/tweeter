using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Features.Users;
using tweeter.Shared;

namespace tweeter.Features.Topics;

public class CreateTopicRequest: IRequest<Response<TopicGetDto>>
{
    public string Name { get; set; }
}

public class CreateTopicRequestHandler : IRequestHandler<CreateTopicRequest, Response<TopicGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<CreateTopicRequest> _validator;
    private readonly IMapper _mapper;
    private readonly SignInManager<User> _signInManager;

    public CreateTopicRequestHandler(
        DataContext dataContext,
        IValidator<CreateTopicRequest> validator,
        IMapper mapper,
        SignInManager<User> signInManager)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
        _signInManager = signInManager;
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
        
        var currentUser = await _signInManager.GetSignedInUserAsync();

        if (currentUser is null)
        {
            return Error.AsResponse<TopicGetDto>("No user signed in");
        }
        
        var topic = _mapper.Map<Topic>(request);
        
        topic.CreatedByUser = currentUser;
        topic.CreatedDate = DateTimeOffset.Now;
        
        _dataContext.Add(topic);
        await _dataContext.SaveChangesAsync();

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