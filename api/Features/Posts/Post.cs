using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using tweeter.Features.Topics;
using tweeter.Features.Users;
using tweeter.Shared.Interfaces;

namespace tweeter.Features.Posts;

public class Post: PostGetDto, IIdentifiable
{
    public User User { get; set; }
    public Topic Topic { get; set; }
}

public class PostDetailDto: PostGetDto
{
    public string CreatedByUserName { get; set; }
}

public class PostGetDto: PostDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTimeOffset CreatedDate { get; set; }
    public bool IsDeleted { get; set; }
}

public class PostDto
{
    public int TopicId { get; set; }
    public string Content { get; set; }
}

public class PostMapper : Profile
{
    public PostMapper()
    {
        CreateMap<Post, PostGetDto>();
        CreateMap<Post, PostDto>().ReverseMap();
        CreateMap<Post, PostDetailDto>()
            .ForMember(dest => dest.CreatedByUserName, opts => opts.MapFrom(src => src.User.UserName));
        
        CreateMap<Post, UpdatePostRequest>().ReverseMap();
    }
}

public class PostValidator : AbstractValidator<PostDto>
{
    public PostValidator()
    {
        RuleFor(x => x.Content)
            .MaximumLength(300)
            .NotEmpty();
        
        RuleFor(x => x.TopicId)
            .GreaterThan(0)
            .NotEmpty();
    }
}

public class PostConfiguration : IEntityTypeConfiguration<Post>
{
    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.ToTable("Posts", "schema");
        
        builder.HasOne(p => p.User)
            .WithMany()
            .HasForeignKey(p => p.UserId)
            .IsRequired();

        builder.HasOne(p => p.Topic)
            .WithMany(x => x.Posts)
            .OnDelete(DeleteBehavior.ClientSetNull);
    }
}
