// import { createContext, useState, useEffect, useContext } from "react";

// const PsychologistContext = createContext();

// export const PsychologistProvider = ({ children }) => {
//   const [psychologists, setPsychologists] = useState([]);

//   useEffect(() => {
//     const fetchPsychologists = async () => {
//       try {
//         const response = await fetch("https://your-api-url.com/psychologists"); // Робимо GET-запит

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json(); // Перетворюємо відповідь в JSON
//         console.log("Завантажені психологи:", data);
//         setPsychologists(data);
//       } catch (error) {
//         console.error("Помилка при завантаженні психологів:", error);
//       }
//     };

//     fetchPsychologists();
//   }, []);

//   return (
//     <PsychologistContext.Provider value={{ psychologists, setPsychologists }}>
//       {children}
//     </PsychologistContext.Provider>
//   );
// };

// export const usePsychologistContext = () => useContext(PsychologistContext);
