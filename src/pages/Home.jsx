import { ContactList } from "../Componenets/ContactList";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/new-contact");
  };
  return (
    <div className="container mx-auto ">
      <div className=" flex justify-between mt-10">
        <p className=" text-2xl md:text-4xl">Contact List</p>
        <button
          className=" py-2 px-2.5 bg-blue-600 duration-300 rounded hover:rounded-md hover:bg-blue-800 text-white text-xs md:text-base"
          onClick={handleButtonClick}
        >
          ADD CONTACT
        </button>
      </div>
      <div className="flex justify-center items-center">
        <ContactList />
      </div>
    </div>
  );
};
