// import { useState, useEffect } from "react";
// import { fetchPsychologists } from "../../services/psychologistService.js";
// import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
// import css from "./PsychologistPage.module.css";

// const PsychologistsPage = () => {
//   const [psychologists, setPsychologists] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(3);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const data = await fetchPsychologists();
//       setPsychologists(data);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   const loadMore = () => {
//     setVisibleCount((prevCount) => prevCount + 3);
//   };

//   return (
//     <div className={css.container}>
//       {loading && <p>Loading...</p>}
//       <div className={css.cardsContainer}>
//         {psychologists.slice(0, visibleCount).map((psych) => (
//           <PsychologistCard key={psych.id} {...psych} />
//         ))}
//       </div>
//       {visibleCount < psychologists.length && (
//         <button className={css.loadMoreButton} onClick={loadMore}>
//           Load more
//         </button>
//       )}
//     </div>
//   );
// };

// export default PsychologistsPage;

import PsychologistListCard from "../../components/PsychologistListCard/PsychologistListCard.jsx";
import css from "./PsychologistPage.module.css";

const PsychologistsPage = () => {
  return (
    <div className={css.container}>
      <PsychologistListCard showFilter={true} enableLoadMore={true} />
    </div>
  );
};

export default PsychologistsPage;
