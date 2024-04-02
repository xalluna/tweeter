using FluentValidation;
using tweeter.Shared.Interfaces;

namespace tweeter.Shared.Validation
{
    public class IIdentifiableValidator : AbstractValidator<IIdentifiable>
    {
        public IIdentifiableValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .GreaterThan(0);
        }
    }
}
