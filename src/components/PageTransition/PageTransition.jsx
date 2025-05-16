// import { motion } from "framer-motion";

// const PageTransition = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       style={{ position: "relative", zIndex: 0 }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default PageTransition;

import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: "none" }}
    >
      <div style={{ pointerEvents: "auto" }}>{children}</div>
    </motion.div>
  );
};

export default PageTransition;
