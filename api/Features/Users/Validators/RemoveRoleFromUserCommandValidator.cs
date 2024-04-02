using FluentValidation;
using tweeter.Features.Users.Commands;

namespace tweeter.Features.Users.Validators
{
    public class RemoveRoleFromUserCommandValidator : AbstractValidator<RemoveRoleFromUserCommand>
    {
        public RemoveRoleFromUserCommandValidator() 
        {
            RuleFor(x => x.UserId)
            .GreaterThan(0);
            RuleFor(x => x.Role.Name)
                .NotEmpty();
        }
    }
}
