/* eslint-disable react/prop-types */
import { FaPhone, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Contact = ({ name, number, id }) => {
  return (
    <div className="flex justify-between py-3 px-4">
      <div className="w-full">
        <Link to={`/contacts/${id}`}>
          <div className="flex items-center">
            <FaUser className="mr-2" />
            {/* <p className=" mr-3 ">Name:</p> */}
            <p className=" font-bold text-md">{name}</p>
          </div>
          <div className="flex items-center ">
            <FaPhone className="mr-2" />
            <p className="">{number}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
