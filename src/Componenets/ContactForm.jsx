import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Error } from "../pages/Error";
import { FallBack } from "../pages";
``;

const CONTACTS_API = "http://localhost:3000/contacts";

export const ContactForm = () => {
  const [contact, setContact] = useState({ name: "", number: "" });
  const [prevContact, setPrevContact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { name, number } = contact;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(CONTACTS_API);
        setPrevContact(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.warn(error);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || number.trim() === "") {
      alert("Fill the Form");
      return;
    }
    if (
      prevContact.find((item) => item.name.toLowerCase() === name.toLowerCase())
    ) {
      return alert("Duplicate");
    }
    try {
      setIsLoading(true);
      await axios.post(CONTACTS_API, contact);
      setContact({ name: "", number: "" });
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.warn(error);
    }
  };
  if (isError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <FallBack />
      </div>
    );
  }

  return (
    <div className="text-center w-full md:w-1/2 bg-slate-200 p-5 rounded shadow-xl mt-10">
      <p className="text-2xl mb-10 ">ADD New Contact</p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="Name:"
            value={name}
            name="name"
            onChange={handleChange}
            className="w-[90%] border p-2 text-black rounded-md mb-4 border-slate-400"
          />
        </div>
        <div className="w-full">
          <input
            type="tel"
            placeholder="Phone Number:"
            value={number}
            name="number"
            onChange={handleChange}
            className="w-[90%] border p-2 text-black rounded-md mb-4 border-slate-400"
          />
        </div>
        <div>
          <button className=" py-2 px-2.5 bg-blue-600 duration-300 rounded hover:bg-blue-800 hover:rounded-md text-white">
            ADD to List
          </button>
        </div>
      </form>
    </div>
  );
};
