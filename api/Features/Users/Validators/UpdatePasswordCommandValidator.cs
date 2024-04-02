using FluentValidation;
using tweeter.Features.Users.Commands;

namespace tweeter.Features.Users.Validators;

public class UpdatePasswordCommandValidator : AbstractValidator<UpdatePasswordCommand>
{
    public UpdatePasswordCommandValidator()
    {
        RuleFor(x => x.PasswordUpdateDto.UserName)
            .NotEmpty();

        RuleFor(x => x.PasswordUpdateDto.NewPasswordConfirmation)
            .NotEmpty();

        RuleFor(x => x.PasswordUpdateDto.NewPassword)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Equal(x => x.PasswordUpdateDto.NewPasswordConfirmation)
            .WithMessage("New Password and New Password Confirmation do not match.");
    }
}