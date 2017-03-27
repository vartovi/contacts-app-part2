using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly ContactService _contactService = new ContactService();

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_contactService.FindAllContacts());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_contactService.FindContactById(id));
        }

        [HttpPost]
        public IActionResult Post([FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }
            return Created($"api/contacts/{contact}", _contactService.CreateNewContact(contact));
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Contact contact)
        {
            return Accepted(_contactService.UpdateContact(id, contact));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _contactService.DeleteContact(id);
            //return NoContent();
            return Ok(_contactService.FindAllContacts());
        }
    }
}
