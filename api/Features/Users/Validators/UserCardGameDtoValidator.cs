﻿using FluentValidation;
using tweeter.Features.Users.Dtos;

namespace tweeter.Features.Users.Validators;

public class UserCardGameDtoValidator : AbstractValidator<UserCardGameDto>
{
    public UserCardGameDtoValidator()
    {
        RuleFor(x => x.UserId)
            .GreaterThan(0);

        RuleFor(x => x.GameId)
            .GreaterThan(0);

        RuleFor(x => x.PageSize)
            .GreaterThan(0);

        RuleFor(x => x.CurrentPage)
            .GreaterThan(0);
    }
}