import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, AddNewContact, FallBack, EditContact } from "./pages/index";
import { Suspense, lazy } from "react";
import { Error } from "./pages/Error";

const ContactInfo = lazy(() => delay(import("./pages/ContactInfo")));

function App() {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-contact" element={<AddNewContact />} />
          <Route
            path="/contacts/:id"
            element={
              <Suspense fallback={<FallBack />}>
                <ContactInfo />
              </Suspense>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Suspense fallback={<FallBack />}>
                <EditContact />
              </Suspense>
            }
          />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function delay(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  }).then(() => promise);
}

export default App;
