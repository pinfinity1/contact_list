// import { ContactEditForm } from "../Componenets/ContactEditForm";

// export const EditContact = () => {
//   return (
//     <div className="mt-10">
//       <ContactEditForm />
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FallBack } from "../pages/FallBack";
import { Error } from "./Error";

const CONTACTS_API = "http://localhost:3000/contacts";

export const EditContact = () => {
  const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getContact = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${CONTACTS_API}/${id}`);
        setContact(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.warn(error);
      }
    };
    getContact();
  }, []);

  if (isLoading) {
    return (
      <div>
        <FallBack />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (!contact) {
    return <div>User Not Found</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.put(`${CONTACTS_API}/${id}`, contact);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };
  const handleChange = (e) => {
    e.preventDefault();
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const { name, number } = contact;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 flex flex-col justify-center items-center mt-10"
    >
      <div className="w-full">
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="w-full border p-2 text-black rounded-md mb-4 border-slate-400"
        />
      </div>
      <div className="w-full">
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          className="w-full border p-2 text-black rounded-md mb-4 border-slate-400"
        />
      </div>
      <div>
        <button className=" py-2 px-5 bg-blue-600 duration-300 rounded hover:bg-blue-800 hover:rounded-md text-white">
          EDIT
        </button>
      </div>
    </form>
  );
};
