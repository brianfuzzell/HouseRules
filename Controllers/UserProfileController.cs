using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HouseRules.Data;
using HouseRules.Models;
using HouseRules.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using HouseRules.Models.DTOs;
using AutoMapper;

namespace HouseRules.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private HouseRulesDbContext _dbContext;
    private readonly IMapper _mapper;

    public UserProfileController(HouseRulesDbContext context, IMapper mapper)
    {
        _dbContext = context;
        _mapper = mapper;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        List<UserProfile> userProfiles = _dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .ToList();

        List<UserProfileDTO> userProfileDTOs = _mapper.Map<List<UserProfileDTO>>(userProfiles);

        return Ok(userProfileDTOs);
    }

    [HttpGet("withroles")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        List<UserProfile> userProfiles = _dbContext.UserProfiles
            .Include(up => up.IdentityUser)
            .ToList();

        List<UserProfileDTO> userProfileDTOs = _mapper.Map<List<UserProfileDTO>>(userProfiles);

        for (int i = 0; i < userProfiles.Count; i++)
        {
            userProfileDTOs[i].Email = userProfiles[i].IdentityUser.Email;
            userProfileDTOs[i].UserName = userProfiles[i].IdentityUser.UserName;

            userProfileDTOs[i].Roles = _dbContext.UserRoles
                .Where(ur => ur.UserId == userProfileDTOs[i].IdentityUserId)
                .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
                .ToList();
        }

        return Ok(userProfileDTOs);
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        UserProfile userProfile = _dbContext
            .UserProfiles
            .Include(up => up.ChoreAssignments)
                .ThenInclude(ca => ca.Chore)
            .Include(up => up.ChoreCompletions)
                .ThenInclude(cc => cc.Chore)
            .SingleOrDefault(up => up.Id == id);

        UserProfileDTO userProfileDTO = _mapper.Map<UserProfileDTO>(userProfile);

        return userProfileDTO != null ? Ok(userProfileDTO) : NotFound();
    }
}