import React, { useState, useEffect } from "react";
import "../src/App.css";
import Header from "./components/Header";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";

import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

function App() {
  const [loading, setloading] = useState(true); // Pre-loader before page renders
  const [contacts, setContacts] = useState([]); // Contacts State
  const [showAddContact, setShowAddContact] = useState(false); // To reveal add Contacts form
  const [personal, setPersonal] = useState(0);
  const [business, setBusiness] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [editedContact, setEditedContact] = useState([]);

  // Pre-loader
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 3500);
  }, []);

  // Fetching from Local Storage
  const getContacts = JSON.parse(localStorage.getItem("contactedAdded"));

  useEffect(
    (type) => {
      if (getContacts == null) {
        setContacts([]);
      } else {
        setContacts(getContacts);
      }
    },
    [getContacts]
  );

  // Add Contact
  const addContact = (contact) => {
    const id = uuidv4();
    const newContact = { id, ...contact };

    setContacts([...contacts, newContact]);

    Swal.fire({
      icon: "success",
      title: "Yay...",
      text: "You have successfully added a new contact!",
    });

    localStorage.setItem(
      "contactAdded",
      JSON.stringify([...contacts, newContact])
    );
  };

  // Delete Contact
  const deleteContact = (id) => {
    const deleteContact = contacts.filter((contact) => contact.id !== id);

    setContacts(deleteContact);

    Swal.fire({
      icon: "success",
      title: "Oops...",
      text: "You have successfully deleted a contact!",
    });

    localStorage.setItem("contactDeleted", JSON.stringify(deleteContact));
  };

  // Edit Contact
  const editContact = (id) => {
    const text = prompt("Contact Name");
    const type = prompt("Type Of Contact");
    let data = JSON.parse(localStorage.getItem("contactAdded"));
    let newData = [];
    const newContact = { id, ...contacts, newData };
    const myData = data.map((x) => {
      if (x.id === id) {
        console.log(x.id, id);
        return {
          ...x,
          text: text,
          type: type,
          id: uuidv4(),
        };
      }
      return x;
    });

    Swal.fire({
      icon: "success",
      title: "Yay...",
      text: "You have successfully edited an existing contact!",
    });

    localStorage.setItem("contactEdited", JSON.stringify(myData));
    console.log(JSON.stringify(myData));
    setContacts(myData);
  };

  const getContactData = (contacts) => {
    setIsActive(!isActive);
    if (contacts.length > 0) {
      let personalContacts = contacts.filter(
        (contacts) => contacts.type.toLowerCase() === "personal"
      );
      setPersonal(personalContacts.length);
    }

    if (contacts.length > 0) {
      let businessContacts = contacts.filter(
        (contacts) => contacts.type.toLowerCase() === "business"
      );
      setBusiness(businessContacts.length);
    }
  };
  return (
    <>
      {loading ? (
        <div className="spinnerContainer">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          {/* App Header that has open and App Name */}
          <Header
            showForm={() => setShowAddContact(!showAddContact)}
            changeTextAndColor={showAddContact}
          />

          {/* Revealing of Add Contact Form */}
          {showAddContact && <AddContact onSave={addContact} />}

          {/* Contact Accordion Details */}

          <div className="accordion-item">
            <div
              className="accordion-title"
              onClick={() => getContactData(contacts)}
            >
              <div>Contact Details</div>
              <div>{isActive ? "-" : "+"}</div>
            </div>
            {isActive && (
              <div className="accordion-content">
                <h3 className="bottom">
                  Number of Contacts: {contacts.length}
                </h3>
                <h3 className="bottom">Personal Contacts:{personal}</h3>
                <h3 className="bottom">Business Contacts:{business}</h3>
              </div>
            )}
          </div>

          <div className="bottom">
            {/* Displaying of Contacts */}
            {contacts.length > 0 ? (
              <Contacts
                contacts={contacts}
                onDelete={deleteContact}
                onEdit={editContact}
              />
            ) : (
              "Contact Does Not Exists!"
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
