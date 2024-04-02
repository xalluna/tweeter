using FluentValidation;
using tweeter.Features.Users.Commands;

namespace tweeter.Features.Users.Validators;

public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
    public UpdateUserCommandValidator(IValidator<UserDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.User)
            .SetValidator(baseValidator);
    }
}