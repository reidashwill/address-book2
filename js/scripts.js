// Business Logic for AddressBook
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId +=1;
  return this.currentId
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        $("#show-contact").hide();
        return true;
      }
    }
  };
  return false
}

//Business Logic for Contacts
function Contact(firstName, lastName, phoneNumber, addresses) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.addresses = [];
} 

Contact.prototype.addAddress = function(address){
  this.addresses.push(address);
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

//Business Logic for Addresses-------
function Addresses(homeAddress, workAddress, personalEmailAddress, workEmailAddress){
  this.homeAddress = homeAddress;
  this.workAddress = workAddress;
  this.personalEmailAddress = personalEmailAddress;
  this.workEmailAddress = workEmailAddress;
}

// User Interface Logic ----------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId){
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  console.log(contact)
  $(".personal-email-address").html(contact.addresses[0].personalEmailAddress);
  $(".work-email-address").html(contact.addresses[0].workEmailAddress)
  $(".home-address").html(contact.addresses[0].homeAddress)
  $(".work-address").html(contact.addresses[0].workAddress)
  
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

function attachContactListeners () {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("show-contact").hide();
    displayContactDetails(addressBook);
  })
};

$(document).ready(function(){
  attachContactListeners();
  $("form#new-contact").submit(function(event){
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedPersonalEmailAddress = $("input#new-personal-email-address").val();
    if (inputtedPersonalEmailAddress === "") {
      $('#pea').remove();
     }
    var inputtedWorkEmailAddress = $("input#new-work-email-address").val();
    if ( inputtedWorkEmailAddress === ""){
      $("#wea").remove();
    }
    var inputtedHomeAddress = $("input#new-home-address").val();
    if (inputtedHomeAddress === "") {
      $('#ha').remove();
     }
    var inputtedWorkAddress = $("input#new-work-address").val();
    if (inputtedWorkAddress === "") {
      $('#wa').remove();
     }
    $("input#new-first-name").val("")
    $("input#new-last-name").val("")
    $("input#new-phone-number").val("")
    $("input#new-personal-email-address").val("")
    $("input#new-work-email-address").val("")
    $("input#new-home-address").val("")
    $("input#new-work-address").val("")
    var newAddresses = new Addresses(inputtedHomeAddress, inputtedWorkAddress, inputtedPersonalEmailAddress, inputtedWorkEmailAddress)
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    newContact.addAddress(newAddresses);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})  