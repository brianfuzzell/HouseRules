using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models.DTOs;
public class RegistrationDTO
{
    [Required]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    [MaxLength(50, ErrorMessage = "Please enter a User Name less than 50 characters in length")]
    public string UserName { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    public string Address { get; set; }

}