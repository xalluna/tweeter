using FluentValidation;
using tweeter.Features.Users.Commands;
using tweeter.Features.Users.Dtos;

namespace tweeter.Features.Users.Validators;

public class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
{
    public DeleteUserCommandValidator(IValidator<UserDeleteDto> baseValidator)
    {
        RuleFor(x => x.DeleteDto)
            .SetValidator(baseValidator);
    }
}