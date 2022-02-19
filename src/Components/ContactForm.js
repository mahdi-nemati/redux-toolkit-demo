import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact, postAsyncContacts } from "../Feature/AsyncToolkit/ContactSlice";
const ContactForm = () => {
  const dispatch = useDispatch();
  const [contact, setContact] = useState({
    name: "",
    email: "",
  });
  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      postAsyncContacts({
        name: contact.name,
        email: contact.email,
      })
    );
    setContact({
      name: "",
      email: "",
    });
  };
  return (
    <form>
      <input
        type="text"
        name="name"
        placeholder="name"
        onChange={changeHandler}
        value={contact.name}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={changeHandler}
        value={contact.email}
      />
      <button onClick={submitHandler}>Submit</button>
    </form>
  );
};

export default ContactForm;
