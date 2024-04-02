using FluentValidation;
using tweeter.Features.Users.Commands;

namespace tweeter.Features.Users.Validators;

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator(IValidator<UserDto> baseValidator)
    {
        RuleFor(x => x.User)
            .SetValidator(baseValidator);

        RuleFor(x => x.User.Password)
            .Must((com, prop) => com.User.ConfirmPassword == prop)
            .WithMessage("Passwords do not match");
    }
}