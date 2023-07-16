import { ContactForm } from "../Componenets/ContactForm";
export const AddNewContact = () => {
  return (
    <div className="text-center w-full md:w-1/2 bg-slate-200 p-5 rounded shadow-xl mt-10">
      <p className="text-2xl mb-10 ">ADD New Contact</p>
      <ContactForm />
    </div>
  );
};
