import { useState, useEffect } from "react";
import axios from "axios";
import { Contact } from "./Contact";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Error } from "../pages/Error";
import { FallBack } from "../pages/FallBack";

const CONTACTS_API = "http://localhost:3000/contacts";

export const ContactList = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getContact = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(CONTACTS_API);
        setContacts(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.warn(error);
      }
    };
    getContact();
  }, []);

  const handleEditChange = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteChange = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${CONTACTS_API}/${id}`).then(() => {
        setContacts(contacts.filter((contact) => contact.id !== id));
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <FallBack />
      </div>
    );
  }
  // if (isError) {
  //   return (
  //     <div>
  //       <Error />
  //     </div>
  //   );
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 md:mt-16 w-full mx-auto">
      {contacts.map(({ id, name, number }) => (
        <div
          key={id}
          className="bg-slate-400 flex justify-between rounded border hover:shadow-xl hover:border-black duration-200"
        >
          <div className="w-full">
            <Contact name={name} number={number} id={id} />
          </div>
          <div className="flex flex-col justify-between items-center gap-1 py-2 pr-2">
            <button
              className="w-6 h-6 bg-stone-200 hover:bg-stone-300 rounded-lg flex justify-center items-center "
              onClick={() => handleDeleteChange(id)}
            >
              <AiOutlineDelete className="text-red-500" />
            </button>
            <button
              className="w-6 h-6 bg-stone-200 hover:bg-stone-300 rounded-lg flex justify-center items-center "
              onClick={() => handleEditChange(id)}
            >
              <AiOutlineEdit />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
