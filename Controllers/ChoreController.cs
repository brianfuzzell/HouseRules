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
public class ChoreController : ControllerBase
{
    private HouseRulesDbContext _dbContext;
    private readonly IMapper _mapper;

    public ChoreController(HouseRulesDbContext context, IMapper mapper)
    {
        _dbContext = context;
        _mapper = mapper;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        List<Chore> chores = _dbContext
            .Chores
            .Include(c => c.ChoreAssignments)
            .Include(c => c.ChoreCompletions)
            .ToList();

        List<ChoreDTO> choreDTOs = _mapper.Map<List<ChoreDTO>>(chores);

        return Ok(choreDTOs);
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        Chore chore = _dbContext
            .Chores
            .Include(c => c.ChoreAssignments)
                .ThenInclude(ca => ca.UserProfile)
            .Include(c => c.ChoreCompletions)
                .ThenInclude(ca => ca.UserProfile)
            .SingleOrDefault(c => c.Id == id);

        ChoreDTO choreDTO = _mapper.Map<ChoreDTO>(chore);

        return choreDTO != null ? Ok(choreDTO) : NotFound();
    }

    [HttpPost("{id}/complete")]
    [Authorize]
    public IActionResult CompleteChore(int id, [FromQuery] int userId)
    {
        Chore choreToComplete = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (choreToComplete == null)
        {
            return NotFound();
        }

        _dbContext.ChoreCompletions.Add(new ChoreCompletion
        {
            UserProfileId = userId,
            ChoreId = id,
            CompletedOn = DateTime.Now
        });

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost]
    //[Authorize(Roles = "Admin")]
    public IActionResult CreateChore(Chore chore)
    {
        _dbContext.Chores.Add(chore);
        _dbContext.SaveChanges();

        return Created($"/api/chore/{chore.Id}", chore);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult UpdateChore(Chore chore, int id)
    {
        Chore choreToUpdate = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (choreToUpdate == null)
        {
            return NotFound();
        }
        else if (id != choreToUpdate.Id)
        {
            return BadRequest();
        }

        choreToUpdate.Name = chore.Name;
        choreToUpdate.Difficulty = chore.Difficulty;
        choreToUpdate.ChoreFrequencyDays = chore.ChoreFrequencyDays;

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteChore(int id)
    {
        Chore choreToDelete = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (choreToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Remove(choreToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost("{id}/assign")]
    [Authorize(Roles = "Admin")]
    public IActionResult AssignChore(int id, [FromQuery] int userId)
    {
        Chore choreToAssign = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (choreToAssign == null)
        {
            return NotFound();
        }

        _dbContext.ChoreAssignments.Add(new ChoreAssignment
        {
            UserProfileId = userId,
            ChoreId = id
        });

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost("{id}/unassign")]
    [Authorize(Roles = "Admin")]
    public IActionResult UnassignChore(int id, [FromQuery] int userId)
    {
        ChoreAssignment choreToUnassign = _dbContext.ChoreAssignments.SingleOrDefault(ca => ca.ChoreId == id && ca.UserProfileId == userId);
        if (choreToUnassign == null)
        {
            return NotFound();
        }

        _dbContext.ChoreAssignments.Remove(choreToUnassign);
        _dbContext.SaveChanges();

        return NoContent();
    }
};