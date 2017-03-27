﻿namespace WebApi.Models
{
    public class Contact
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }

        public Contact(string firstName, string lastName, string phone, string streetAddress, string city)
        {         
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            StreetAddress = streetAddress;
            City = city;
        }

    }
}
