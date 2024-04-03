using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using tweeter.Features.Users;
using tweeter.Features.UserTopics;
using tweeter.Shared.Interfaces;

namespace tweeter.Features.Topics;

public class Topic: TopicGetDto 
{
    public User CreatedByUser { get; set; }
    public List<UserTopic> UserTopics { get; set; }
}

public class TopicGetDto: TopicDto, IIdentifiable
{
    public int Id { get; set; }
}

public class TopicDto
{
    public string Name { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTimeOffset CreatedDate { get; set; }
}

public class TopicValidator : AbstractValidator<TopicDto>
{
    public TopicValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
        
        RuleFor(x => x.Name.Length)
            .LessThanOrEqualTo(TopicConfiguration.NameLength);
        
        RuleFor(x => x.CreatedByUserId)
            .NotEmpty();
    }
}

public class TopicMapper : Profile
{
    public TopicMapper()
    {
        CreateMap<Topic, TopicGetDto>();
        CreateMap<Topic, TopicDto>().ReverseMap();
    }
}

public class TopicConfiguration : IEntityTypeConfiguration<Topic>
{
    public const int NameLength = 100;

    public void Configure(EntityTypeBuilder<Topic> builder)
    {
        builder.ToTable("Topics", "schema");
    }
}