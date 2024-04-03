#pragma warning disable CS8618
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using tweeter.Features.Users;

namespace tweeter.Data;

public class DataContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole<int>>().ToTable("AspNetRoles", "identity");
        modelBuilder.Entity<IdentityUserRole<int>>().ToTable("AspNetUserRoles", "identity");
        modelBuilder.Entity<IdentityUserClaim<int>>().ToTable("AspNetUserClaims", "identity");
        modelBuilder.Entity<IdentityUserLogin<int>>().ToTable("AspNetUserLogins", "identity");
        modelBuilder.Entity<IdentityRoleClaim<int>>().ToTable("AspNetRoleClaims", "identity");
        modelBuilder.Entity<IdentityUserToken<int>>().ToTable("AspNetUserTokens", "identity");

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
    }
}