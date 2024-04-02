using FluentValidation;
using tweeter.Features.Users.Commands;

namespace tweeter.Features.Users.Validators
{
    public class AddRoleToUserCommandValidator : AbstractValidator<AddRoleToUserCommand>
    {
        public AddRoleToUserCommandValidator()
        {
            RuleFor(x => x.Id)
            .GreaterThan(0);
            RuleFor(x => x.Role.Name)
                .NotEmpty();
        }
    }
}
