import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FallBack } from "./FallBack";
import { Error } from "./Error";

const CONTACTS_API = "http://localhost:3000/contacts";

const ContactInfo = () => {
  const [contactInfo, setContactInfo] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getContact = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${CONTACTS_API}/${id}`);
        setContactInfo(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    getContact();
  }, []);

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

  if (!contactInfo) {
    return <div>User Not Found</div>;
  }

  const { name, number } = contactInfo;

  return (
    <div className="w-1/2 bg-slate-100 rounded border p-10 mt-10 text-lg shadow-xl">
      <div className="text-center border-b p-3">
        <p className="text-2xl">CONTACT</p>
      </div>
      <div className="p-2 mt-2">
        <div>
          <p className="text-slate-500 text-lg">Name:</p>
          <div className="mx-2 mt-2 p-2 bg-slate-200 rounded-md text-center shadow-sm text-xl border">
            <p>{name}</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-slate-500 text-lg">Phone Number:</p>
          <div className="mx-2 mt-2 p-2 bg-slate-200 rounded-md text-center shadow-sm text-xl border">
            <p className="">{number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
