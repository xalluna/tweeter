﻿namespace tweeter.Features.Users.Dtos;

public class UserPasswordUpdateDto
{
    public string UserName { get; set; }
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
    public string NewPasswordConfirmation { get; set; }
}
