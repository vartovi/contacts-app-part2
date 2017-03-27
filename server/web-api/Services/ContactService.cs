using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Services
{
    public class ContactService
    {
        
        private static string json = System.IO.File.ReadAllText("contacts.json");
        private readonly List<Contact> contacts = JsonConvert.DeserializeObject<List<Contact>>(json);
  
        public List<Contact> FindAllContacts()
        {
            //var contacts = JsonConvert.DeserializeObject<List<Contact>>(json);
            return contacts;
        }

        public Contact FindContactById(int id)
        {
            //var contacts = JsonConvert.DeserializeObject<List<Contact>>(json);
            var contact = contacts[id];
            return contact;
        }

        public List<Contact> CreateNewContact(Contact contact)
        {
            contacts.Add(contact);
            json = JsonConvert.SerializeObject(contacts);
            System.IO.File.WriteAllText("contacts.json", json);
            return contacts;
        }

        public Contact UpdateContact(int id, Contact contact)
        {
            var contactToUpdate = contacts[id];
            var index = contacts.IndexOf(contactToUpdate);
            contacts[index] = contact;
            json = JsonConvert.SerializeObject(contacts);
            System.IO.File.WriteAllText("contacts.json", json);
            return contact;
        }

        public void DeleteContact(int id)
        {
            //var contactToDelete = contacts.FirstOrDefault(c => c.Id == id);
            contacts.RemoveAt(id);
            json = JsonConvert.SerializeObject(contacts);
            System.IO.File.WriteAllText("contacts.json", json);
           
        }
    }
}
