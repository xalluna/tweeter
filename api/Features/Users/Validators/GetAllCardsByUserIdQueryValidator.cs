using FluentValidation;
using tweeter.Features.Users.Queries;

namespace tweeter.Features.Users.Validators;

public class GetAllCardsByUserIdQueryValidator : AbstractValidator<GetAllCardsByUserIdQuery>
{
    public GetAllCardsByUserIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}
