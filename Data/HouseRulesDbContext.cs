using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Data;

public class HouseRulesDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<Chore> Chores { get; set; }

    public DbSet<ChoreAssignment> ChoreAssignments { get; set; }

    public DbSet<ChoreCompletion> ChoreCompletions { get; set; }

    public DbSet<UserProfile> UserProfiles { get; set; }

    public HouseRulesDbContext(DbContextOptions<HouseRulesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });

        modelBuilder.Entity<IdentityUser>().HasData(
        new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        },
        new IdentityUser
        {
            Id = "8f7b2e4a-1c3d-4f6e-9a8b-5d2c1e0f3a4b",
            UserName = "jsmith",
            Email = "jsmith@example.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        },
        new IdentityUser
        {
            Id = "2a4c6e8f-3b5d-4a7c-8e9f-1d3c5b7a9e0d",
            UserName = "mjones",
            Email = "mjones@example.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        }
        );

        modelBuilder.Entity<UserProfile>().HasData(
            new UserProfile
            {
                Id = 1,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Admina",
                LastName = "Strator",
                Address = "101 Main Street",
            },
            new UserProfile
            {
                Id = 2,
                IdentityUserId = "8f7b2e4a-1c3d-4f6e-9a8b-5d2c1e0f3a4b",
                FirstName = "John",
                LastName = "Smith",
                Address = "202 Oak Avenue",
            },
            new UserProfile
            {
                Id = 3,
                IdentityUserId = "2a4c6e8f-3b5d-4a7c-8e9f-1d3c5b7a9e0d",
                FirstName = "Mary",
                LastName = "Jones",
                Address = "303 Pine Street",
            }
        );

        modelBuilder.Entity<Chore>().HasData(new Chore[]
        {
            new Chore
            {
                Id = 1,
                Name = "Mow the Lawn",
                Difficulty = 4,
                ChoreFrequencyDays = 14
            },
            new Chore
            {
                Id = 2,
                Name = "Wash Dishes",
                Difficulty = 2,
                ChoreFrequencyDays = 1
            },
            new Chore
            {
                Id = 3,
                Name = "Vacuum Living Room",
                Difficulty = 2,
                ChoreFrequencyDays = 7
            },
            new Chore
            {
                Id = 4,
                Name = "Clean Bathroom",
                Difficulty = 3,
                ChoreFrequencyDays = 7
            },
            new Chore
            {
                Id = 5,
                Name = "Take Out Trash",
                Difficulty = 1,
                ChoreFrequencyDays = 3
            }
        });

        modelBuilder.Entity<ChoreAssignment>().HasData(new ChoreAssignment[]
        {
            new ChoreAssignment
            {
                Id = 1,
                UserProfileId = 1,
                ChoreId = 1
            },
            new ChoreAssignment
            {
                Id = 2,
                UserProfileId = 1,
                ChoreId = 2
            }
        });

        modelBuilder.Entity<ChoreCompletion>().HasData(new ChoreCompletion[]
        {
            new ChoreCompletion
            {
                Id = 1,
                UserProfileId = 1,
                ChoreId = 3,
                CompletedOn = new DateTime(2026, 6, 15)
            }
        });
    }
}