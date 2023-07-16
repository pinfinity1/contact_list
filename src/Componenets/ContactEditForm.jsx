import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FallBack } from "../pages/FallBack";
import { Error } from "../pages/Error";

const CONTACTS_API = "http://localhost:3000/contacts";

export const ContactEditForm = () => {
  const [contactEdit, setContactEdit] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getContact = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${CONTACTS_API}/${id}`);
        setContactEdit(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("edit shod");
  };
  const handleChange = () => {
    console.log("avaz shod");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col justify-center items-center"
    >
      <div className="w-full">
        <input
          type="text"
          placeholder="Name:"
          value={contactEdit.name}
          name="name"
          onChange={handleChange}
          className="w-[90%] border p-2 text-black rounded-md mb-4 border-slate-400"
        />
      </div>
      <div className="w-full">
        <input
          type="tel"
          placeholder="Phone Number:"
          value={id}
          name="number"
          onChange={handleChange}
          className="w-[90%] border p-2 text-black rounded-md mb-4 border-slate-400"
        />
      </div>
      <div>
        <button className=" py-2 px-2.5 bg-blue-600 duration-300 rounded hover:bg-blue-800 hover:rounded-md text-white">
          EDIT
        </button>
      </div>
    </form>
  );
};
