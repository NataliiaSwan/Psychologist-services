import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import PsychologistPage from "../../pages/PsychologistPage/PsychologistPage.jsx";

import Layout from "../../components/Layout/Layout.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="psychologists" element={<PsychologistPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
