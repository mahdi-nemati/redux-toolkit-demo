import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAsyncContacts,
  deleteContact,
  getAsyncContacts,
} from "../Feature/AsyncToolkit/ContactSlice";
const ContactList = () => {
  const { contact, error, loading } = useSelector((store) => store.contact);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAsyncContacts());
  }, []);
  if (loading) return <p>loading...</p>;
  if (error) return <p>somthing went wrong !</p>;
  const deleteHandler = (id) => {
    dispatch(deleteAsyncContacts({id}));
  };
  return (
    <section>
      {contact.map((c) => {
        return (
          <div key={c.id}>
            <ul>
              <li>{c.name}</li>
              <li>{c.email}</li>
            </ul>
            <button onClick={() => deleteHandler(c.id)}>Delete</button>
          </div>
        );
      })}
    </section>
  );
};

export default ContactList;
