// const {nanoid} = require("nanoid")
const fs = require('fs/promises')
const path = require("path");

const contactsPath = path.join(__dirname, "model", "contacts.json");



const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data)
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(contact=>contact.id === contactId);
  if(!result){
    return null;
  }
  return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.findIndex(contact=>contact.id === contactId);
  console.log(result);
  if(result === -1){
    return null;
  }
  const [removedContact] = contacts.splice(result, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}
// async function addContact(name, email, phone) {
  // const contacts = await listContacts();
  // const newContact = {name, email, phone, id: nanoid()}
  // contacts.push(newContact);
  // await fs.writeFile(contactsPath, JSON.stringify(contacts));
  // return newContact;
// }
const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {name, email, phone, id: nanoid()}
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
