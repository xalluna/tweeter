using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tweeter.Data;
using tweeter.Shared;

namespace tweeter.Features.Posts;

public class DeletePostByIdRequest : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeletePostByIdRequestHandler : IRequestHandler<DeletePostByIdRequest, Response>
{
    private readonly IValidator<DeletePostByIdRequest> _validator;
    private readonly IMapper _mapper;
    private readonly DataContext _dataContext;

    public DeletePostByIdRequestHandler(IValidator<DeletePostByIdRequest> validator,
        IMapper mapper, DataContext dataContext)
    {
        _validator = validator;
        _mapper = mapper;
        _dataContext = dataContext;
    }

    public async Task<Response> Handle(DeletePostByIdRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var post = await _dataContext.Set<Post>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (post is null)
        {
            return Error.AsResponse("Post not found", "id");
        }

        post.IsDeleted = true;
        await _dataContext.SaveChangesAsync(cancellationToken);

        return Response.Success;
    }
}

public class DeletePostByIdRequestValidator : AbstractValidator<DeletePostByIdRequest>
{
    public DeletePostByIdRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .GreaterThan(0);
    }
}
