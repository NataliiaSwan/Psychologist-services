// import { useLocation } from "react-router-dom";
// import PsychologistListCard from "../../components/PsychologistListCard/PsychologistListCard.jsx";
// import css from "./PsychologistPage.module.css";
// import PageTransition from "../../components/PageTransition/PageTransition.jsx";

// const PsychologistsPage = () => {
//   const location = useLocation();

//   // Отримуємо параметри з URL
//   const queryParams = new URLSearchParams(location.search);

//   // Перевіряємо параметр "experienced" з URL
//   const isExperiencedChecked = queryParams.get("experienced") === "true";

//   return (
//     <PageTransition>
//       <div className={css.psychologistPageContainer}>
//         <PsychologistListCard showExperiencedOnly={isExperiencedChecked} />
//       </div>
//     </PageTransition>
//   );
// };

// export default PsychologistsPage;

// import { useSearchParams } from "react-router-dom";
// import PsychologistListCard from "../../components/PsychologistListCard/PsychologistListCard.jsx";
// import css from "./PsychologistPage.module.css";
// import PageTransition from "../../components/PageTransition/PageTransition.jsx";

// const PsychologistsPage = () => {
//   const [searchParams] = useSearchParams();
//   const experiencedParam = searchParams.get("experienced");
//   const showExperiencedOnly = experiencedParam === "true";

//   return (
//     <PageTransition>
//       <div className={css.psychologistPageContainer}>
//         <PsychologistListCard showExperiencedOnly={showExperiencedOnly} />
//       </div>
//     </PageTransition>
//   );
// };

// export default PsychologistsPage;

import PsychologistListCard from "../../components/PsychologistListCard/PsychologistListCard.jsx";
import css from "./PsychologistPage.module.css";
import PageTransition from "../../components/PageTransition/PageTransition.jsx";

const PsychologistsPage = () => {
  return (
    <PageTransition>
      <div className={css.psychologistPageContainer}>
        <PsychologistListCard />
      </div>
    </PageTransition>
  );
};

export default PsychologistsPage;
