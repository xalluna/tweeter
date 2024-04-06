using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using tweeter.Features.Topics;
using tweeter.Features.Users;
using tweeter.Shared.Interfaces;

namespace tweeter.Features.UserTopics;

public class UserTopic: UserTopicGetDto
{
    public User User { get; set; }
    public Topic Topic { get; set; }
}

public class UserTopicGetDto: UserTopicDto, IIdentifiable
{
    public int Id { get; set; }
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
        CreateMap<SubscribeToTopicRequest, UserTopic>();
    }
}

public class UserTopicConfiguration : IEntityTypeConfiguration<UserTopic>
{
    public void Configure(EntityTypeBuilder<UserTopic> builder)
    {
        builder.ToTable("UserTopics", "schema");

        builder.HasOne(x => x.Topic)
            .WithMany(x => x.UserTopics)
            .OnDelete(DeleteBehavior.ClientCascade);
        
        builder.HasOne(x => x.User)
            .WithMany(x => x.UserTopics)
            .OnDelete(DeleteBehavior.ClientCascade);
    }
}