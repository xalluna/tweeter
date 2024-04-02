using FluentValidation;
using tweeter.Features.Users.Dtos;
using tweeter.Features.Users.Queries;

namespace tweeter.Features.Users.Validators;

public class GetAllCardsByGameIdAndUserIdQueryValidator : AbstractValidator<GetAllCardsByGameIdAndUserIdQuery>
{
    public GetAllCardsByGameIdAndUserIdQueryValidator(IValidator<UserCardGameDto> baseValidator)
    {
        RuleFor(x => x.UserCardGame)
            .SetValidator(baseValidator);
    }
}
