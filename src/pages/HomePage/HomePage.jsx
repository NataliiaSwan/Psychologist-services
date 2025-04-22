// import HeroSection from "../../components/HeroSection/HeroSection.jsx";

// import css from "./HomePage.module.css";

// import { useNavigate } from "react-router-dom";

// const HomePage = ({ user, setIsRegisterOpen, setIsLoginOpen }) => {
//   const navigate = useNavigate();

//   const handleGetStarted = (isExperiencedChecked) => {
//     if (user) {
//       navigate(`/psychologists?experienced=${isExperiencedChecked}`);
//     } else if (localStorage.getItem("isRegistered")) {
//       setIsLoginOpen(true);
//     } else {
//       setIsRegisterOpen(true);
//     }
//   };

//   return (
//     <div className={css.pageContainer}>
//       <HeroSection
//         user={user}
//         setIsRegisterOpen={setIsRegisterOpen}
//         setIsLoginOpen={setIsLoginOpen}
//         onGetStarted={handleGetStarted}
//       />
//     </div>
//   );
// };
// export default HomePage;

import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import css from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

const HomePage = ({ user, setIsRegisterOpen, setIsLoginOpen }) => {
  const navigate = useNavigate();

  const handleGetStarted = (isExperiencedChecked) => {
    if (user) {
      navigate(`/psychologists?experienced=${isExperiencedChecked}`);
    } else if (localStorage.getItem("isRegistered")) {
      setIsLoginOpen(true);
    } else {
      setIsRegisterOpen(true);
    }
  };

  return (
    <div className={css.pageContainer}>
      <HeroSection onGetStarted={handleGetStarted} />
    </div>
  );
};

export default HomePage;
