using System.Text.RegularExpressions;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using tweeter.Shared.Interfaces;

namespace tweeter.Features.Users;

public class User : IdentityUser<int>, IIdentifiable
{
    public List<IdentityUserClaim<int>> Claims { get; set; }
    public List<IdentityUserLogin<int>> Logins { get; set; }
    public List<IdentityUserToken<int>> Tokens { get; set; }
    public List<IdentityUserRole<int>> Roles { get; set; }
}

public class UserGetDto : UserDto
{
    public int Id { get; set; }
}

public class UserDto
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}

public class UserCreateDto: UserDto
{
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
}

public class UserPasswordUpdateDto
{
    public string UserName { get; set; }
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
    public string NewPasswordConfirmation { get; set; }
}

public class SignInUserDto
{
    public string UserName { get; set; }
    public string Password { get; set; }
}

public class UserDtoValidator : AbstractValidator<UserDto>
{
    private static readonly Regex PhoneNumberFormat = new ("^(\\+\\d{1,2}?)?\\d{10}$");

    public UserDtoValidator()
    {
        RuleFor(x => x.UserName)
            .MaximumLength(25)
            .NotEmpty();

        RuleFor(x => x.Email)
            .EmailAddress();

        RuleFor(x => x.PhoneNumber)
            .Matches(PhoneNumberFormat)
            .WithMessage("Invalid phone number. Must be in the format: ########## May include '+#' for Country Code");
    }
}

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<User, UserGetDto>();
        CreateMap<User, UserDto>().ReverseMap();
    }
}

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("AspNetUsers", "identity");
        builder.HasKey(x => x.Id);

        builder.HasMany(x => x.Claims)
            .WithOne()
            .HasForeignKey(x => x.UserId)
            .IsRequired();

        builder.HasMany(x => x.Logins)
            .WithOne()
            .HasForeignKey(x => x.UserId)
            .IsRequired();

        builder.HasMany(x => x.Tokens)
            .WithOne()
            .HasForeignKey(x => x.UserId)
            .IsRequired();
        
        builder.HasMany(x => x.Roles)
            .WithOne()
            .HasForeignKey(x => x.UserId)
            .IsRequired();
    }
}