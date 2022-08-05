import { motion } from "framer-motion";

import "./errorPage.css";

function ErrorPage(error: any) {
  return (
    <motion.div
      className="error"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerHeight }}
    >
      <div>
        <h2>Unable to complete the request</h2>
        <p>Try again in some time!</p>
        <p>{error.error}</p>
      </div>
    </motion.div>
  );
}

export default ErrorPage;
