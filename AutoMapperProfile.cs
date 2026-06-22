using AutoMapper;
using HouseRules.Models;
using HouseRules.Models.DTOs;

namespace HouseRules.Models;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {

        CreateMap<Chore, ChoreDTO>();
        CreateMap<ChoreDTO, Chore>();
        CreateMap<ChoreAssignment, ChoreAssignmentDTO>();
        CreateMap<ChoreAssignmentDTO, ChoreAssignment>();
        CreateMap<ChoreCompletion, ChoreCompletionDTO>();
        CreateMap<ChoreCompletionDTO, ChoreCompletion>();
        CreateMap<UserProfile, UserProfileDTO>();
        CreateMap<UserProfileDTO, UserProfile>();
    }
}