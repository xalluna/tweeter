using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using tweeter.Features.Topics;
using tweeter.Features.Users;

namespace tweeter.Features.UserTopics;

public class UserTopic: UserTopicDto
{
    public User User { get; set; }
    public Topic Topic { get; set; }
}

public class UserTopicDto
{
    public int UserId { get; set; }
    public int TopicId { get; set; }
}

public class UserTopicValidator : AbstractValidator<UserTopicDto>
{
    public UserTopicValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty();
        
        RuleFor(x => x.TopicId)
            .NotEmpty();
    }
}

public class UserTopicMapper : Profile
{
    public UserTopicMapper()
    {
        CreateMap<UserTopic, UserTopicDto>().ReverseMap();
    }
}

public class UserTopicConfiguration : IEntityTypeConfiguration<UserTopic>
{
    public void Configure(EntityTypeBuilder<UserTopic> builder)
    {
        builder.ToTable("UserTopics", "schema");
        builder.HasKey(x => new {x.UserId, x.TopicId});
    }
}